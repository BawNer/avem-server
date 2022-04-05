import { AuthGuard } from "@app/user/guards/auth.guard";
import { Controller, Get, HttpException, HttpStatus, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ScheduleService } from "./schedule.service";
import { extname } from "path";
import { Throttle } from "@nestjs/throttler";

@Controller('schedule')
export class ScheduleController {
  constructor (
    private readonly scheduleService: ScheduleService
  ) {}

  @Throttle(3, 60)
  @Get()
  async getSchedule(@Query() query: any): Promise<any> {
    const schedule = await this.scheduleService.getSchedule(query)
    return { schedule }
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('schedule', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          cb(null, `${randomName}${extname(file.originalname)}`)
        }
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.toLowerCase().match(/\.(dbf)$/)) {
          throw new HttpException('Only DBF files are allowed!', HttpStatus.CONFLICT)
        }
        cb(null, true);
      }
    })
  )
  async uploadSchedule(@UploadedFile() dbf: Express.Multer.File) {
    const schema = await this.scheduleService.uploadSchema(dbf)

    return schema
  }
}
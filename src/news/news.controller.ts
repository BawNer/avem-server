import { User } from "@app/user/decorators/user.decorator";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { UserEntity } from "@app/user/user.entity";
import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { DeleteResult } from "typeorm";
import { CreateNewsDto } from "./dto/createNews.dto";
import { NewsEntity } from "./news.entity";
import { NewsService } from "./news.service";
import { NewsResponseInterface } from "./types/newsResponse.interface";
import { editFileName, imageFileFilter } from "./utils/fileUpload.utils";

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService
  ) {}

  @Get()
  async findAll(): Promise<NewsResponseInterface> {
    const news = await this.newsService.findAll()
    return this.newsService.buildResponse(news)
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 5 },
        { name: 'preview', maxCount: 1 }
      ],
      {
        storage: diskStorage({
          destination: './uploads/news',
          filename: editFileName
        }),
        fileFilter: imageFileFilter
      }
    )
  )
  async createNews(
    @UploadedFiles() files: { photo: Express.Multer.File[], preview: Express.Multer.File },
    @Body() createNewsDto: CreateNewsDto,
    @User() user: UserEntity
  ) {
    const news = await this.newsService.createNews(files, createNewsDto, user)
    return { news }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteNews(@Param('id') id: number): Promise<DeleteResult> {
    return await this.newsService.deleteNews(id)
  }
}
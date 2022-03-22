import { User } from "@app/user/decorators/user.decorator";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { UserEntity } from "@app/user/user.entity";
import { Body, Controller, Get, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
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
  async tester(
    @UploadedFiles() files: { photo: Express.Multer.File[], preview: Express.Multer.File },
    @Body() createNewsDto: CreateNewsDto,
    @User() user: UserEntity
  ) {
    const news = await this.newsService.createNews(files, createNewsDto, user)

    return { news }
  }
}
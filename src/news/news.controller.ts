import { User } from "@app/user/decorators/user.decorator";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { UserEntity } from "@app/user/user.entity";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateNewsDto } from "./dto/createNews.dto";
import { NewsService } from "./news.service";
import { NewsResponseInterface } from "./types/newsResponse.interface";

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
  async createNews(@User() user: UserEntity, @Body('news') createNewsDto: CreateNewsDto): Promise<NewsResponseInterface> {
    return this.newsService.buildResponse(await this.newsService.createNews(user, createNewsDto))
  }
}
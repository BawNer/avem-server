import { AuthGuard } from "@app/user/guards/auth.guard";
import { Controller, Get, Post, UseGuards } from "@nestjs/common";
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

  // @Post()
  // @UseGuards(AuthGuard)
  // async createNews()
}
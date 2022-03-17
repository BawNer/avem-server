import { UserEntity } from "@app/user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNewsDto } from "./dto/createNews.dto";
import { NewsEntity } from "./news.entity";
import { NewsResponseInterface } from "./types/newsResponse.interface";
import slugify from "slugify";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>
  ) {}

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find()
  }

  async createNews(user: UserEntity, createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const news = new NewsEntity()

    Object.assign(news, createNewsDto)

    news.slug = this.getSlug(createNewsDto.title)

    news.author = user

    return await this.newsRepository.save(news)
  }

  buildResponse(news: NewsEntity | NewsEntity[]): NewsResponseInterface {
    return {
      news
    }
  }

  private getSlug(title: string): string {
    return slugify(title, {lower: true}) + '-' + ((Math.random() * Math.pow(36, 6) | 0).toString(36))
  }
 
}
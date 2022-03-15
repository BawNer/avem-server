import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewsEntity } from "./news.entity";
import { NewsResponseInterface } from "./types/newsResponse.interface";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>
  ) {}

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find()
  }

  buildResponse(news: NewsEntity | NewsEntity[]): NewsResponseInterface {
    return {
      news
    }
  }

}
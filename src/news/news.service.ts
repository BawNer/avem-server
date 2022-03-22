import { UserEntity } from "@app/user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNewsDto } from "./dto/createNews.dto";
import { NewsEntity } from "./news.entity";
import { NewsResponseInterface } from "./types/newsResponse.interface";
import slugify from "slugify";
import { convertingFormatFile, convertingFormatFiles } from "./utils/fileUpload.utils";
import { AuthorType } from "./types/author.type";



@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>
  ) {}

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find()
  }

  async createNews(
    files: { photo: Express.Multer.File[], preview: Express.Multer.File }, 
    createNewsDto: CreateNewsDto, 
    user: UserEntity
  ): Promise<NewsEntity> {
    const news = new NewsEntity()

    Object.assign(news, createNewsDto)

    news.slug = this.getSlug(createNewsDto.title)

    delete user.accessToken
    delete user.refreshToken
    delete user.phone
    delete user.isPhoneActive
    delete user.isEmailActive

    news.author = user

    const photos = await convertingFormatFiles(files.photo)
    const preview = await convertingFormatFile(files.preview[0])

    news.photos = []
    photos.forEach(photo => {
      news.photos.push({
        filename: photo.filename,
        path: `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${photo.path}`
      })
    })

    news.preview = {
      filename: preview.filename,
      path: `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${preview.path}`
    }

    return await this.newsRepository.save(news)
  }

  buildResponse(news: NewsEntity[]): NewsResponseInterface {
    return {
      news,
      newsCount: news.length
    }
  }

  private getSlug(title: string): string {
    return slugify(title, {lower: true}) + '-' + ((Math.random() * Math.pow(36, 6) | 0).toString(36))
  }
 
}
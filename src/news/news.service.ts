import { UserEntity } from "@app/user/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { CreateNewsDto } from "./dto/createNews.dto";
import { NewsEntity } from "./news.entity";
import { NewsResponseInterface } from "./types/newsResponse.interface";
import slugify from "slugify";
import { convertingFormatFile, convertingFormatFiles } from "./utils/fileUpload.utils";
import * as fs from 'fs'
import * as path from 'path'



@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>
  ) {}

  async findAll(query: any): Promise<NewsEntity[]> {
    const queryBuilder = getRepository(NewsEntity).createQueryBuilder('news').leftJoinAndSelect('news.author', 'author')
    queryBuilder.orderBy('news.createdAt' ,'DESC')
    
    if (query.offset) {
      queryBuilder.offset(query.offset)
    }

    if (query.limit) {
      queryBuilder.limit(query.limit)
    }

    const news = await queryBuilder.getMany()

    news.forEach(el => {
      delete el.author.accessToken
      delete el.author.refreshToken
      delete el.author.phone
      delete el.author.isPhoneActive
      delete el.author.isEmailActive
    })

    return news
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

  async deleteNews(id: number): Promise<DeleteResult> {
    const news = await this.newsRepository.findOne(id)
    if (!news) {
      throw new HttpException('Bad credintails', HttpStatus.FORBIDDEN)
    }

    if (Array.isArray(news.photos)) {
      news.photos.forEach(photo => {
        fs.unlinkSync(path.join(__dirname, `../../uploads/news/${photo.filename}`))
      })
    }

    if (news.preview) {
      fs.unlinkSync(path.join(__dirname, `../../uploads/news/${news.preview.filename}`))
    }

    return await this.newsRepository.delete(id)
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
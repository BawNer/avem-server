import { NewsEntity } from "../news.entity";

export interface NewsResponseInterface {
  news:  NewsEntity[],
  newsCount: number
}
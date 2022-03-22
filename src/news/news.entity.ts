import { UserEntity } from "@app/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'news' })
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  slug: string

  @Column()
  title: string

  @Column()
  annonce: string

  @Column()
  content: string

  @Column({type: 'simple-json', default: null})
  photos: object[]

  @Column({type: 'simple-json', default: null})
  preview: { filename: string, path: string }

  @Column({type: 'simple-array', default: 'all'})
  visible: string[]

  @Column({type: 'simple-array', default: null})
  tags: string[]

  @Column({type: 'simple-array'})
  meta: string[]

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @ManyToOne(() => UserEntity, user => user.news, {eager: true})
  author: UserEntity
}
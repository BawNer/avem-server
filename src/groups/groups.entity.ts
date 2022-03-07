import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'groups' })
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
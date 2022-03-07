import { UsersEntity } from "@app/users/users.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'groups' })
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToOne(() => UsersEntity, user => user.groupId)
  user: UsersEntity
}
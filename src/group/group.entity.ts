import { UserEntity } from "@app/user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => UserEntity, user => user.group)
  users: UserEntity[]
}
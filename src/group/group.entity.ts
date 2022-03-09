import { UserEntity } from "@app/user/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToOne(() => UserEntity, user => user.groupId)
  user: UserEntity
}
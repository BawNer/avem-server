import { UsersEntity } from "@app/users/users.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({name: 'roles'})
export class RolesEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  access: string

  @OneToMany(() => UsersEntity, user => user.roleId)
  user: UsersEntity
}
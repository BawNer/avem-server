import { UserEntity } from "@app/user/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, ManyToMany } from "typeorm";

@Entity({name: 'roles'})
export class RoleEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('simple-array')
  access: string

  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity[]
}
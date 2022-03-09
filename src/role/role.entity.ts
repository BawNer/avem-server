import { UserEntity } from "@app/user/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from "typeorm";

@Entity({name: 'roles'})
export class RoleEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('simple-array')
  access: string

  @OneToMany(() => UserEntity, user => user.roleId)
  user: UserEntity
}
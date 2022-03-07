import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt'
import { GroupsEntity } from "@app/groups/groups.entity";
import { RolesEntity } from "@app/roles/roles.entity";

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: null })
  roleId: number

  @Column({ default: null })
  groupId: number

  @Column()
  username: string

  @Column()
  bio: string

  @Column({ default: null })
  photo: string

  @Column({ default: null })
  phone: string

  @Column()
  email: string

  @Column()
  login: string

  @Column({ select: false })
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }

  @Column()
  refreshToken: string

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  lastsignIn: string

  @Column({default: false})
  isEmailActive: boolean

  @Column({default: false})
  isPhoneActive: boolean

  @OneToOne(() => GroupsEntity, group => group.id)
  group: GroupsEntity

  @OneToMany(() => RolesEntity, role => role.id)
  roles: RolesEntity[]
}
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt'
import { GroupEntity } from "@app/group/group.entity";
import { RoleEntity } from "@app/role/role.entity";
import { TokenEntity } from "@app/token/token.entity";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

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
  lastSignIn: string

  @Column({default: false})
  isEmailActive: boolean

  @Column({default: false})
  isPhoneActive: boolean

  @OneToOne(() => TokenEntity, token => token.user, {eager: true})
  @JoinColumn()
  accessToken: TokenEntity

  @ManyToMany(() => RoleEntity, role => role.users, {eager: true})
  @JoinTable()
  roles: RoleEntity[]

  @ManyToOne(() => GroupEntity, group => group.users, {eager: true})
  group: GroupEntity
}
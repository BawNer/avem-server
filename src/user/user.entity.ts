import { BeforeInsert, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt'
import { GroupEntity } from "@app/group/group.entity";
import { RoleEntity } from "@app/role/role.entity";
import { TokenEntity } from "@app/token/token.entity";

@Entity({ name: 'users' })
export class UserEntity {
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
  lastSignIn: string

  @Column({default: false})
  isEmailActive: boolean

  @Column({default: false})
  isPhoneActive: boolean

  @ManyToOne(() => GroupEntity, group => group.id, {eager: true})
  group: GroupEntity

  @ManyToOne(() => RoleEntity, role => role.id, {eager: true})
  role: RoleEntity

  @OneToOne(() => TokenEntity, token => token.userId, {eager: true})
  token: TokenEntity
}
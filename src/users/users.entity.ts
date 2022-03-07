import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  refreshToken: string

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  lastsignIn: string

  @Column({default: false})
  isEmailActive: boolean

  @Column({default: false})
  isPhoneActive: boolean
}
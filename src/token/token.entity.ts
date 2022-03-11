import { UserEntity } from "@app/user/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  token: string

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: string

}
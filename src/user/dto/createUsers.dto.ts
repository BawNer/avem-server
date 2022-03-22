import { IsEmail, IsNotEmpty } from "class-validator"
import { Timestamp } from "typeorm"

export class CreateUserDto {
  readonly roleId: number

  readonly groupId: number

  @IsNotEmpty()
  readonly username: string

  @IsNotEmpty()
  readonly bio: string

  readonly photo: string

  readonly phone: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly login: string

  @IsNotEmpty()
  readonly password: string

}
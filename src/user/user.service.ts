import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { JWT_SECRET } from "@app/config";
import { CreateUserDto } from "./dto/createUsers.dto";

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return user
  }

  async createUser(createUsersDto: CreateUserDto): Promise<UserEntity> {
    const userByLogin = await this.userRepository.findOne({login: createUsersDto.login})
    const userByEmail = await this.userRepository.findOne({email: createUsersDto.email})
    const userByUsername = await this.userRepository.findOne({username: createUsersDto.username})

    if (userByLogin || userByEmail || userByUsername) {
      throw new HttpException('Login, email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const newUser = new UserEntity()
    Object.assign(newUser, createUsersDto)
    newUser.refreshToken = this.generateJwt(newUser)
    return await this.userRepository.save(newUser)
  }

  generateJwt(user: UserEntity): string {
    return sign({
      id: user.id,
      login: user.login,
      username: user.username,
      role: user?.roles,
      lastSignIn: user.lastSignIn
    }, JWT_SECRET)
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      }
    }
  }
}
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindRelationsNotFoundError, Repository } from "typeorm";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { JWT_SECRET } from "@app/config";
import { CreateUserDto } from "./dto/createUsers.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { TokenService } from "@app/token/token.service";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService
  ) {}

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
    const user = await this.userRepository.save(newUser)
    const token = await this.tokenService.createToken(user)
    user.accessToken = token
    return await this.userRepository.save(user)
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({login: loginUserDto.login}, { 
      select: ['id', 'username', 'bio', 'photo', 'phone', 'email', 'login', 'password', 'refreshToken', 'isEmailActive', 'isPhoneActive'], relations: ['accessToken', 'roles', 'group']
    })

    if (!user) { throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY) }

    const isPasswordCorrect = await compare(loginUserDto.password, user.password)

    if (!isPasswordCorrect) { throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY) }

    delete user.password
    
    return user
  }

  async updateUser(updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserEntity> {
    console.log(user)
    Object.assign(user, updateUserDto)
    const newToken = await this.tokenService.updateToken({
      userToken: user.accessToken.token,
      userRefreshUserToken: user.refreshToken
    })
    user.accessToken = newToken

    return await this.userRepository.save(user)
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

  // buildUserResponse(user: UserEntity): UserResponseInterface {
  //   return {
  //     user: {
  //       ...user,
  //       token: this.generateJwt(user)
  //     }
  //   }
  // }
}
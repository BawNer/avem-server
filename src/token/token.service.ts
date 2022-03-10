import { UserEntity } from "@app/user/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TokenEntity } from "./token.entity";
import { sign, verify } from "jsonwebtoken"
import { JWT_SECRET } from "@app/config";
import { UserService } from "@app/user/user.service";

@Injectable()
export class TokenService {
  constructor (
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly userService: UserService
  ) {}

  async findToken(userId: number): Promise<TokenEntity> {
    const token = await this.tokenRepository.findOne({ userId })

    if (!token) { throw new HttpException('Token not found', HttpStatus.NOT_FOUND) }

    return token
  }

  async createToken(user: UserEntity): Promise<TokenEntity> {
    const userToken = await this.tokenRepository.findOne({userId: user.id})

    if (userToken) { throw new HttpException(`Token are exist`, HttpStatus.FORBIDDEN) }

    const token = sign({
      uid: user.id,
      login: user.login,
      username: user.username,
      role: user?.role,
      lastSignIn: user.lastSignIn
    }, JWT_SECRET)
    const newToken = new TokenEntity()

    Object.assign(newToken, {userId: user.id, token})

    return await this.tokenRepository.save(newToken)
  }

  async verifyToken(userToken: string): Promise<TokenEntity> {
    const token = await this.tokenRepository.findOne({token: userToken})

    if (!token) { throw new HttpException('Token not found', HttpStatus.CONFLICT) }

    const tokenCreatedAt = new Date(token.createdAt).getTime()
    const currentTime = new Date().getTime()

    if ( ((currentTime - tokenCreatedAt) / (1000 * 60)) < 15 ) {
      return token
    } else {
      throw new HttpException('Token are not valid', HttpStatus.BAD_REQUEST)
    }

  }

  async updateToken(userToken: string, userRefreshToken: string): Promise<TokenEntity> {
    const token = await this.tokenRepository.findOne({token: userToken})

    if (!token) { throw new HttpException('Token not found', HttpStatus.CONFLICT) }

    const decodeUserToken = verify(token, JWT_SECRET)

    const user = await this.userService.findById(decodeUserToken.id)

    if (userRefreshToken !== user.refreshToken) { throw new HttpException('Refresh token not valid', HttpStatus.CONFLICT) }

    return await this.createToken(user)
  }
}
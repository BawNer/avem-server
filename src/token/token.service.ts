import { UserEntity } from "@app/user/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TokenEntity } from "./token.entity";
import { sign } from "jsonwebtoken"
import { JWT_SECRET } from "@app/config";

@Injectable()
export class TokenService {
  constructor (
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>
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
}
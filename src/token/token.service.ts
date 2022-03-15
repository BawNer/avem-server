import { UserEntity } from "@app/user/user.entity";
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TokenEntity } from "./token.entity";
import { sign, verify } from "jsonwebtoken"
import { JWT_SECRET } from "@app/config";
import { UserService } from "@app/user/user.service";
import { UpdateTokenDto } from "./dto/updateToken.dto";

@Injectable()
export class TokenService {
  constructor (
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async findToken(tokenId: number): Promise<TokenEntity> {
    const token = await this.tokenRepository.findOne({ id: tokenId })

    if (!token) { throw new HttpException('Token not found', HttpStatus.NOT_FOUND) }

    return token
  }

  async createToken(user: UserEntity): Promise<TokenEntity> {

    const userToken = await this.tokenRepository.findOne({id: user.id})

    if (userToken) { throw new HttpException(`Token are exist`, HttpStatus.FORBIDDEN) }

    const token = sign({
      uid: user.id,
      login: user.login,
      username: user.username,
      role: user?.roles,
      lastSignIn: user.lastSignIn
    }, JWT_SECRET)

    const newToken = new TokenEntity()

    Object.assign(newToken, {token})

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

  async updateToken(updateTokenDto: UpdateTokenDto): Promise<TokenEntity> {
    const token = await this.tokenRepository.findOne({token: updateTokenDto.userToken})

    if (!token) { throw new HttpException('Token not found', HttpStatus.CONFLICT) }

    const decodeUserToken = verify(token, JWT_SECRET)

    const user = await this.userService.findById(decodeUserToken.id)

    if (updateTokenDto.userRefreshUserToken !== user.refreshToken) { 
      throw new HttpException('Refresh token not valid', HttpStatus.CONFLICT)
    }

    const newToken = sign({
      uid: user.id,
      login: user.login,
      username: user.username,
      role: user?.roles,
      lastSignIn: user.lastSignIn
    }, JWT_SECRET)

    Object.assign(token, {token: newToken})

    return await this.tokenRepository.save(token)
  }
}
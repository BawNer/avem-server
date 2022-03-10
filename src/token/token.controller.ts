import { AuthGuard } from "@app/user/guards/auth.guard";
import { UserEntity } from "@app/user/user.entity";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TokenResponseInterface } from "./types/tokenResponse.interface";

@Controller('token')
export class TokenController {
  constructor (
    private readonly tokenService: TokenService
  ) {}

  @Get(':userId')
  @UseGuards(AuthGuard)
  async findToken(@Param('userId') userId: number): Promise<TokenResponseInterface> {
    const token = await this.tokenService.findToken(userId)
    return { token }
  }

  @Post('create')
  async createToken(@Body('user') user: UserEntity): Promise<TokenResponseInterface> {
    const token = await this.tokenService.createToken(user)
    return { token }
  }

  @Post('verify')
  async verifyToken(@Body('token') userToken: string): Promise<TokenResponseInterface> {
    const token = await this.tokenService.verifyToken(userToken)
    return { token }
  }
}
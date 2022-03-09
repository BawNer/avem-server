import { JWT_SECRET } from "@app/config";
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { UserService } from "../user.service";
import { verify } from 'bcrypt'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor (
    private readonly userService: UserService
  ) {}

  async use (req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null
      next()
      return
    }

    const token = req.headers.authorization.split(' ').pop()

    try {
      const decode = verify(token, JWT_SECRET)
      const user = await this.userService.findById(decode.id)
      req.user = user
      next()
    } catch (err) {
      req.user = null
      next()
    }
  }
}
import { UserModule } from "@app/user/user.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenController } from "./token.controller";
import { TokenEntity } from "./token.entity";
import { TokenService } from "./token.service";

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), UserModule],
  controllers: [TokenController],
  providers: [TokenService]
})
export class TokenModule {}
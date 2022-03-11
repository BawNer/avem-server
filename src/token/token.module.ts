import { UserModule } from "@app/user/user.module";
import { UserService } from "@app/user/user.service";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenController } from "./token.controller";
import { TokenEntity } from "./token.entity";
import { TokenService } from "./token.service";

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), forwardRef(() => UserModule)],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
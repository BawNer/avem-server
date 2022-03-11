import { IsNotEmpty } from "class-validator";

export class UpdateTokenDto {
  @IsNotEmpty()
  readonly userToken: string

  @IsNotEmpty()
  readonly userRefreshUserToken: string
}
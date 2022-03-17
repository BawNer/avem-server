import { IsNotEmpty } from "class-validator";

export class CreateNewsDto {
  @IsNotEmpty()
  readonly title: string

  @IsNotEmpty()
  readonly annonce: string

  @IsNotEmpty()
  readonly content: string

  @IsNotEmpty()
  readonly meta: string

}
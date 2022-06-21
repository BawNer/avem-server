import { IsNotEmpty } from 'class-validator';

export class UpdateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  date: Date;

  @IsNotEmpty()
  audience: string;
}

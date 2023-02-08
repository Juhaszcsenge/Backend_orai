import { IsDateString, IsEmail, IsInt, IsOptional, Min } from 'class-validator';

export default class NewAlkalmazottDto {
  @IsOptional()
  @IsDateString()
  kezdoDatum: string | Date;
  @Min(0)
  @IsInt()
  haviBer: number;
  @IsEmail()
  hivatalosEmail: string;
}

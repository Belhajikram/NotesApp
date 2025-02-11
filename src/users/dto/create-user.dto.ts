import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateUserDto {

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

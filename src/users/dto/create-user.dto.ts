import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateUserDto {

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsString()
  github?: string;

  @ApiProperty()
  @IsString()
  linkedin?: string;
}

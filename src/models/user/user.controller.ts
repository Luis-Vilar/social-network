import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto';
@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('user')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}

import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('user')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
  @Put('user/:id')
  async updateUser(
    @Body() userData: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.updateUser({ id, data: userData });
  }
}

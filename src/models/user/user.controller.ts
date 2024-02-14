import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto, UpdateUserDto, UserWhitoutPasswordDto } from './dto';
import { UserService } from './user.service';
@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    const userExists = await this.userService.userByEmail(userData.email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const newUser = this.userService.createUser(userData);

    return newUser;
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('user/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(
    @Body() userData: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserModel> {
    const userExists = await this.userService.userById(id);
    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }
    const userUpdated = this.userService.updateUser({ id, data: userData });

    return userUpdated;
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<UserWhitoutPasswordDto> {
    const userExists = await this.userService.userById(id);
    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = userExists;
    return user;
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('user/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Request() req): Promise<UserModel> {
    const isUserOnRequest = req.user;
    console.log(isUserOnRequest);
    const idOfAuthenticatedUser = req.user.sub as string;
    const deletedUser = await this.userService.deleteUser({
      id: idOfAuthenticatedUser,
    });

    return deletedUser;
  }
}

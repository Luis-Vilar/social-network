import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async userByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }
  async userById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    id: string;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { id, data } = params;
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const userExists = await this.prisma.user.findUnique({
      where,
    });
    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }
    const deleted = this.prisma.user.delete({
      where,
    });
    if (!deleted) {
      throw new InternalServerErrorException(
        'User not deleted, try again later',
      );
    }
    return deleted;
  }
}

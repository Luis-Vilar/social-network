import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email: string;
  user_name: string;
  password: string;
  avatar?: string;
  github?: string;
  linkedin?: string;
}

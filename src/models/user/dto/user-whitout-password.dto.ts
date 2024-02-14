import { ApiProperty } from '@nestjs/swagger';
export class UserWhitoutPasswordDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  github?: string;

  @ApiProperty()
  linkedin?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Roles } from 'src/enum/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: Roles,
  })
  @IsEnum(Roles, { message: 'Role must be `BUYER` or `SELLER`' })
  @IsNotEmpty({ message: 'Role must be `BUYER` or `SELLER`' })
  role: Roles;
}
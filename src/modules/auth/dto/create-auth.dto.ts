import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Username for Account',
    type: 'string',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password for Account',
    type: 'string',
  })
  @IsNotEmpty()
  password: string;
}

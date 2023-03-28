import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';

@Controller('auth')
@ApiTags('AUTHENTICATION')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() authLogin: AuthDto) {
    const loginDetail = await this.authService.login(authLogin);

    return {
      message: 'Login Successful!',
      data: loginDetail,
    };
  }
}

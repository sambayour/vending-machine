import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { AuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  public async login(authPayload: AuthDto) {
    const user = await this.validateUser(authPayload);

    const payload = {
      userId: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      role: user.role,
    };
  }
  public async validateUser(authPayload: AuthDto): Promise<User> {
    const { username, password } = authPayload;
    const user = await this.userService.findByEmail(username);

    if (!(await user?.validatePassword(password))) {
      throw new HttpException('Incorrect Credential', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}

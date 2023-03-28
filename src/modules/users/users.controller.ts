import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
  Logger,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/misc/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@Controller('users')
@ApiTags('USERS')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() userData: CreateUserDto) {
    delete userData['deposit'];
    const user = await this.userService.create(userData);
    return {
      message: 'User Created',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Header('Content-Type', 'application/json')
  @Get()
  public async indexUsers() {
    return {
      message: 'Users Retrieved',
      data: await this.userService.findAll(),
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Header('Content-Type', 'application/json')
  public async getMe(@Req() req) {
    return {
      message: 'User Retrieved',
      data: await this.userService.findById(req.user?.userId),
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Header('Content-Type', 'application/json')
  public async showUser(@Param() param: { id: number }) {
    const { id } = param;
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User Retrieved',
      data: user,
    };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Header('Content-Type', 'application/json')
  public async updateMe(@Req() req, @Body() meData: UpdateUserDto) {
    meData.role = undefined;
    delete meData['deposit'];
    const user = await this.userService.update(req.user?.userId, meData);
    return {
      message: 'User Updated',
      data: user,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Header('Content-Type', 'application/json')
  public async update(
    @Param() param: { id: number },
    @Body() userData: UpdateUserDto,
  ) {
    delete userData['deposit'];
    const user = await this.userService.update(param.id, userData);
    return {
      message: 'User Updated',
      data: user,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() param: { id: number }) {
    await this.userService.delete(param.id);
  }
}

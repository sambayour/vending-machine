import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DuplicateDatabaseEntryError } from '../../enum/db.error.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  public async create(data: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(data);
      await this.userRepository.save(newUser);

      newUser.password = undefined;
      return newUser;
    } catch (error) {
      this.logger.error(error);
      if (error?.code === DuplicateDatabaseEntryError.uniqueErrorKey) {
        throw new HttpException(
          'User with that username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      this.logger.error(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findByEmail(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  public async findAll() {
    const user = await this.userRepository.find();
    return user.map((user) => ({ ...user, password: undefined })); // remove password from list
  }

  public async findById(id) {
    const user = await this.userRepository.findOne(id);
    return user ? { ...user, password: undefined } : user;
  }

  public async update(id, data: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (data.username) {
      const userWithUsername = await this.userRepository.findOne({
        where: { username: data.username, id: Not(id) },
      });

      if (userWithUsername) {
        throw new HttpException('Username is taken', HttpStatus.FORBIDDEN);
      }
    }

    user.username = data.username || user.username;
    user.role = data.role || user.role;

    if (data.password) {
      user.password = data.password;
    }

    await this.userRepository.save(user);

    user.password = undefined;
    return user;
  }

  public async delete(id): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);
  }
}

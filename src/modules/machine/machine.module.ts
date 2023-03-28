import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entity/product.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { Order } from './entity/order.entity';
import SystemsController from './machine.controller';
import SystemsService from './machine.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User, Product, Order])],
  providers: [SystemsService],
  controllers: [SystemsController],
})
export class MachineModule {}

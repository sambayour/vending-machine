import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { JwtStrategy } from './modules/auth/misc/jwt.strategy';
import { MachineModule } from './modules/machine/machine.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    UsersModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MachineModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

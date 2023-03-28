import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      Logger.log('value missing for ', this.env[key]);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProductions() {
    const mode = this.getValue('NODE_ENV', false);
    return mode == 'production';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'test') {
      return {
        type: 'mysql',
        host: this.getValue('TEST_DB_HOST'),
        port: parseInt(this.getValue('TEST_DB_PORT')),
        username: this.getValue('TEST_DB_USER'),
        password: this.getValue('TEST_DB_PASSWORD'),
        database: this.getValue('TEST_DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],

        synchronize: true,
      };
    }
    return {
      type: 'mysql',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],

      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'PG_HOST',
  'PG_PORT',
  'PG_USER',
  'PG_PASSWORD',
  'PG_DATABASE',
]);

export { configService };

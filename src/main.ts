import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 2023;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Vending Service')
    .setDescription('API for a vending machine.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'defaultBearerAuth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(port);
  console.log('App started on', port);
}
bootstrap().catch((err) => console.log(err));

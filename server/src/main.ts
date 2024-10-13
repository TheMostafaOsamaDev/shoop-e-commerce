import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Shoop! E-commerce')
    .setDescription(
      'This is the API documentation for the Shoop! E-commerce application',
    )
    .setVersion('1.0')
    .addCookieAuth('auth-cookie', {
      type: 'apiKey',
      name: 'authorization',
      in: 'cookie',
      description: 'Authorization cookie to access the protected routes',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();

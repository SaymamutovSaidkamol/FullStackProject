import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/upload/',
  });

  const config = new DocumentBuilder()
    .setTitle('Restaurant Management')
    .setDescription('The Restaurant Management API description')
    .setVersion('1.0')
    .addSecurityRequirements('bearer', ['bearer'])
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe(),
    new ValidationPipe({
      transform: true, // 🟢 BU SHART
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

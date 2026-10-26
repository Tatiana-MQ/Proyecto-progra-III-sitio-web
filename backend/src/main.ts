import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // permitir peticiones desde el frontend
  app.enableCors();

  // las fotos subidas se pueden ver en http://localhost:3000/uploads/nombre.jpg
  app.useStaticAssets('uploads', { prefix: '/uploads/' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // iniciar el servidor en el puerto 3000
  await app.listen(3000);

  console.log('API de Artesanías Guapinol corriendo en http://localhost:3000');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = config.API_PORT;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.enableCors();
  await app.listen(PORT, '0.0.0.0', () =>
    console.log(`Server is running on port`, PORT),
  );
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DevLogger } from './logger/dev-logger.service';
import { JsonLogger } from './logger/json-logger.service';
import { TskvLogger } from './logger/tskv-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const loggerType = process.env.LOGGER || 'dev';
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  switch (loggerType) {
    case 'dev':
      app.useLogger(new DevLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
  }
  await app.listen(3000);
}
bootstrap();

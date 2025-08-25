import { NestFactory } from '@nestjs/core';
import { FieldModule } from './field.module';
import { config } from '../config/environment';

async function bootstrap() {
  const app = await NestFactory.create(FieldModule);
  app.enableCors();

  await app.listen(config.services.field.port);
  console.log(`Field service running on port ${config.services.field.port}`);
}
bootstrap();

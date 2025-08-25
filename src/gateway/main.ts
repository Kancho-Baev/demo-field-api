import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { config } from '../config/environment';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.enableCors();

  await app.listen(config.services.gateway.port);
  console.log(`Gateway running on port ${config.services.gateway.port}`);
  console.log(
    `GraphQL Playground available at http://localhost:${config.services.gateway.port}/graphql`
  );
}
bootstrap();

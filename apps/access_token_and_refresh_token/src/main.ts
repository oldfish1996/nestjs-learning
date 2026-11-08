import { NestFactory } from '@nestjs/core';
import { AccessTokenAndRefreshTokenModule } from './access_token_and_refresh_token.module';

async function bootstrap() {
  const app = await NestFactory.create(AccessTokenAndRefreshTokenModule);
  app.enableCors();
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { SingleTokenRefreshModule } from './single_token_refresh.module';

async function bootstrap() {
  const app = await NestFactory.create(SingleTokenRefreshModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

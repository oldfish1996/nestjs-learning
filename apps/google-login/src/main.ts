import { NestFactory } from '@nestjs/core';
import { GoogleLoginModule } from './google-login.module';

async function bootstrap() {
  const app = await NestFactory.create(GoogleLoginModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { PassportModule } from './passport.module';

async function bootstrap() {
  const app = await NestFactory.create(PassportModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

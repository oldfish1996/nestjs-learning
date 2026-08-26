import { NestFactory } from '@nestjs/core';
import { MiddlewareTestModule } from './middleware-test.module';

async function bootstrap() {
  const app = await NestFactory.create(MiddlewareTestModule);
  await app.listen(process.env.port ?? 3004);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestRedisTestModule } from './nest-redis-test.module';

async function bootstrap() {
  const app = await NestFactory.create(NestRedisTestModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

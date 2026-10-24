import { NestFactory } from '@nestjs/core';
import { NestDockerTestModule } from './nest-docker-test.module';

async function bootstrap() {
  const app = await NestFactory.create(NestDockerTestModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

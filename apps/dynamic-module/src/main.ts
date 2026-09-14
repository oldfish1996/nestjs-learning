import { NestFactory } from '@nestjs/core';
import { DynamicModuleModule } from './dynamic-module.module';

async function bootstrap() {
  const app = await NestFactory.create(DynamicModuleModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

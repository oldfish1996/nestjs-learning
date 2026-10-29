import { NestFactory } from '@nestjs/core';
import { TypeormTreeEntityModule } from './typeorm-tree-entity.module';

async function bootstrap() {
  const app = await NestFactory.create(TypeormTreeEntityModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

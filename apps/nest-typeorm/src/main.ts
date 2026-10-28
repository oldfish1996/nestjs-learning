import { NestFactory } from '@nestjs/core';
import { NestTypeormModule } from './nest-typeorm.module';

async function bootstrap() {
  const app = await NestFactory.create(NestTypeormModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

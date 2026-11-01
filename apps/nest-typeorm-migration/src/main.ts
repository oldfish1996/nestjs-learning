import { NestFactory } from '@nestjs/core';
import { NestTypeormMigrationModule } from './nest-typeorm-migration.module';

async function bootstrap() {
  const app = await NestFactory.create(NestTypeormMigrationModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

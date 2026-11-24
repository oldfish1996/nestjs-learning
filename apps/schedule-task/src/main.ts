import { NestFactory } from '@nestjs/core';
import { ScheduleTaskModule } from './schedule-task.module';

async function bootstrap() {
  const app = await NestFactory.create(ScheduleTaskModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

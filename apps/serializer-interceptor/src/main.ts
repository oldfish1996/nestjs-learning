import { NestFactory } from '@nestjs/core';
import { SerializerInterceptorModule } from './serializer-interceptor.module';

async function bootstrap() {
  const app = await NestFactory.create(SerializerInterceptorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

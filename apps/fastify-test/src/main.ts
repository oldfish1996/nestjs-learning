import { NestFactory } from "@nestjs/core";
import { FastifyTestModule } from "./fastify-test.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    FastifyTestModule,
    new FastifyAdapter(),
  );
  await app.listen(process.env.port ?? 3003);
}
bootstrap();

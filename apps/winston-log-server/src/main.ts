import { NestFactory } from "@nestjs/core";
import { WinstonLogServerModule } from "./winston-log-server.module";

async function bootstrap() {
  const app = await NestFactory.create(WinstonLogServerModule);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

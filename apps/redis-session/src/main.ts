import { NestFactory } from "@nestjs/core";
import { RedisSessionModule } from "./redis-session.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(RedisSessionModule);
  app.use(cookieParser());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

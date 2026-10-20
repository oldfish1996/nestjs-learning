import { NestFactory } from "@nestjs/core";
import { NestMulterModule } from "./nest-multer.module";

async function bootstrap() {
  const app = await NestFactory.create(NestMulterModule, { cors: true });
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

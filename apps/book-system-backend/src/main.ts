import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { BookSystemBackendModule } from "./book-system-backend.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    BookSystemBackendModule,
  );

  //  指定 transform: true 之后，就会转为 dto 的实例了
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  app.useStaticAssets(join(__dirname, "uploads"), {
    prefix: "/uploads",
  });

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

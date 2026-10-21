import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { BookSystemBackendModule } from "./book-system-backend.module";

async function bootstrap() {
  const app = await NestFactory.create(BookSystemBackendModule);

  //  指定 transform: true 之后，就会转为 dto 的实例了
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

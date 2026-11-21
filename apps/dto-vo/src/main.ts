import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DtoVoModule } from "./dto-vo.module";

async function bootstrap() {
  const app = await NestFactory.create(DtoVoModule);

  // transform 指定为 true，这样会自动把参数的 js 对象转换为 dto 类型对象。
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

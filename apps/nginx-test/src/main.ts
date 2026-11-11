import { NestFactory } from "@nestjs/core";
import { NginxTestModule } from "./nginx-test.module";

async function bootstrap() {
  const app = await NestFactory.create(NginxTestModule);

  // nginx配置以后可以直接访问 80/api

  app.setGlobalPrefix("api");

  await app.listen(process.env.port ?? 3002);
}
bootstrap();

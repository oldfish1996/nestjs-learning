import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 访问路径为 localhost:3000/static
  app.useStaticAssets("public", { prefix: "/static" });

  const port = process.env.PORT ?? 3000;

  await app.listen(port);
  console.log(`Nest learning API is running on http://localhost:${port}`);


  // 测试 destroyed 生命周期
  setTimeout(() => {
    app.close();
  }, 3000);
}

void bootstrap();

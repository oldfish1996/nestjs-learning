import { NestFactory } from "@nestjs/core";
import { VersionTestModule } from "./version-test.module";
import { VersioningType } from "@nestjs/common";
import type { Request } from "express";

async function bootstrap() {
  const app = await NestFactory.create(VersionTestModule);

  // 自定义版本提取器，根据URL中的版本号提取版本
  const extractor = (request: unknown) => {
    const expressRequest = request as Request;

    if (expressRequest.headers["disable-custom"]) {
      return "";
    }
    return expressRequest.url.includes("v2") ? "2" : "1";
  };
  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor,
  });
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

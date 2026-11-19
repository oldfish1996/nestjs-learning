import { NestFactory } from "@nestjs/core";
import { NearbySearchModule } from "./nearby-search.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "node:path";

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(NearbySearchModule);
  app.useStaticAssets(join(process.cwd(), "apps/nearby-search/public"), {
    prefix: "/static",
  });
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

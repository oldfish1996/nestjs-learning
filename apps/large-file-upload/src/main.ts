import { NestFactory } from "@nestjs/core";
import { LargeFileUploadModule } from "./large-file-upload.module";

async function bootstrap() {
  const app = await NestFactory.create(LargeFileUploadModule);

  app.enableCors();

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

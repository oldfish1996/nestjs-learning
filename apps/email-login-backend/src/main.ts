import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { EmailLoginBackendModule } from "./email-login-backend.module";

async function bootstrap() {
  const app = await NestFactory.create(EmailLoginBackendModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

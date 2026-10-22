import { NestFactory } from "@nestjs/core";
import { NestWinstonModule } from "./nest-winston.module";
// import { MyLogger } from "./my-logger";
import { WINSTON_LOGGER } from "./winston/winston.module";

async function bootstrap() {
  const app = await NestFactory.create(NestWinstonModule);

  app.useLogger(app.get(WINSTON_LOGGER));

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

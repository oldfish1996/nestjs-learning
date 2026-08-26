import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;

  // app.setGlobalPrefix("dynamic");

  await app.listen(port);
  console.log(`Dynamic Module lab is running on http://localhost:${port}`);
}

void bootstrap();

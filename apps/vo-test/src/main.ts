import { NestFactory } from "@nestjs/core";
import { VoTestModule } from "./vo-test.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(VoTestModule);

  const config = new DocumentBuilder()
    .setTitle("Vo Test API")
    .setDescription("Vo Test API")
    .setVersion("1.0")
    .addTag("vo-test")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

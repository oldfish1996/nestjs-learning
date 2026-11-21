import { NestFactory } from "@nestjs/core";
import { SwaggerTestModule } from "./swagger-test.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(SwaggerTestModule);

  const config = new DocumentBuilder()
    .setTitle("Test API")
    .setDescription("Test API")
    .setVersion("1.0")
    .addTag("test")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();

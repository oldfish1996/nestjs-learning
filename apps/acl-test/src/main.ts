import { NestFactory } from "@nestjs/core";
import { AclTestModule } from "./acl-test.module";
import session from "express-session";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AclTestModule);

  app.use(
    session({
      secret: "chenys",
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

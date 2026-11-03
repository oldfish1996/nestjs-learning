import { NestFactory } from "@nestjs/core";
import { NestJwtModule } from "./nest-jwt.module";
import session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(NestJwtModule);

  app.use(
    session({
      secret: "chenys",
      resave: false, // true 是每次访问都会更新 session, false 是只在有session内容变了时才会更新
      saveUninitialized: false, // saveUninitalized 设置为 true 是不管是否设置 session，都会初始化一个空的 session 对象
    }),
  );
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

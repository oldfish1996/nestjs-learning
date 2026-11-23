import { NestFactory } from "@nestjs/core";
import { ArticleViewModule } from "./article-view.module";
import session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(ArticleViewModule);

  app.use(
    session({
      secret: "chenys",
      resave: false,
      saveUninitialized: false,
    }),
  );
  
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

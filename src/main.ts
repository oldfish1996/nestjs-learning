import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import { LoginGuard } from "./login.guard";
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: "chenys",
      cookie: {
        maxAge: 100000,
      },
    }),
  );

  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log(chalk.bgCyan("[middleware] before"), req.url);
    next();
    console.log(chalk.bgMagenta("[middleware] after"));
  });

  // 访问路径为 localhost:3000/static
  // app.useStaticAssets("public", { prefix: "/static" });

  const port = process.env.PORT ?? 3000;

  // app.useGlobalGuards(new LoginGuard());
  await app.listen(port);
  console.log(`Nest learning API is running on http://localhost:${port}`);

  // 测试 destroyed 生命周期
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}

void bootstrap();

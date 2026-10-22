import { NestFactory } from "@nestjs/core";
import { NestLoggerModule } from "./nest-logger.module";
import { MyLogger, MyLogger2 } from "./my-logger";

async function bootstrap() {
  const app = await NestFactory.create(NestLoggerModule, {
    // logger: false,
    // logger: ["error", "warn"],
    // logger: new MyLogger(), // 自定义日志记录器
    // logger: new MyLogger2(), // 自定义日志记录器2
    // bufferLogs 就是先不打印日志，把它放到 buffer 缓冲区，直到用 useLogger 指定了 Logger 并且应用初始化完毕。
    bufferLogs: true, 
  });

  // 从 Nest 容器获取实例，确保 NestLoggerService 已完成依赖注入。
  app.useLogger(app.get(MyLogger2));
  
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

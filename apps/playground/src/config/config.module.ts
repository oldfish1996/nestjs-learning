import { Module } from "@nestjs/common";
import { APP_CONFIG, START_TIME } from "./app-config.token";
import { appConfig } from "./app.config";

@Module({
  // 理解provider不只是Service类，也可以是固定值，工厂函数或替换实现
  providers: [
    {
      provide: APP_CONFIG,
      useValue: appConfig,
    },
    {
      provide: START_TIME,
      // 只会在初始化执行一次，所以重复请求，这个时间戳是固定的
      useFactory: () => new Date().toISOString(),
    },
  ],

  exports: [APP_CONFIG, START_TIME],
})
export class ConfigModule {}

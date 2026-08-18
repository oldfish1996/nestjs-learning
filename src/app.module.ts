import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ArticlesModule } from "./articles/articles.module";
import { NotesModule } from "./notes/notes.module";
import { ConfigModule } from "./config/config.module";
import { CommonModule } from "./common/common.module";
import { LogMiddleware } from "./log.middleware";
import { LoginGuard } from "./login.guard";

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    NotesModule,
    ConfigModule,
    CommonModule,
  ],
  controllers: [AppController], // 控制器，只能被注入
  // providers 可以被注入，也能注入到其他对象
  providers: [
    AppService,
    // 全局Guard，这种方式可以被注入
    // {
    //   provide: "APP_GUARD",
    //   useClass: LoginGuard,
    // },
  ],
  // providers: [
  //   // AppService, // 简写
  //   {
  //     provide: "app-service", // 指定token
  //     useClass: AppService,
  //   }
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({path:'aaa', method: RequestMethod.GET});
  }
}

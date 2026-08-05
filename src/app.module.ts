import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ArticlesModule } from "./articles/articles.module";
import { NotesModule } from "./notes/notes.module";
import { ConfigModule } from "./config/config.module";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    NotesModule,
    ConfigModule,
    CommonModule,
  ],
  controllers: [AppController], // 控制器，只能被注入
  // providers: [AppService], // 可以被注入，也能注入到其他对象
  providers: [
    // AppService, // 简写
    {
      provide: "app-service", // 指定token
      useClass: AppService,
    }
  ],
})
export class AppModule {}

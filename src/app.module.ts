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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ArticleViewController } from "./article-view.controller";
import { ArticleViewService } from "./article-view.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { ArticleModule } from "./article/article.module";
import { Article } from "./article/entities/article.entity";
import { User } from "./user/entities/user.entity";
import { RedisModule } from './redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "article_view",
      synchronize: true,
      logging: true,
      entities: [User, Article],
    }),
    UserModule,
    ArticleModule,
    RedisModule,
    TaskModule,
  ],
  controllers: [ArticleViewController],
  providers: [ArticleViewService],
})
export class ArticleViewModule {}

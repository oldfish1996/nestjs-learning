import { Injectable, Inject } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ArticleService } from "../article/article.service";

@Injectable()
export class TaskService {
  @Inject(ArticleService)
  private readonly articleService: ArticleService;

  // 阅读量存在redis里，每10秒刷新一次到数据库
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCronJob() {
    // console.log("10 seconds passed");
    await this.articleService.flushRedisToDB();
  }
}

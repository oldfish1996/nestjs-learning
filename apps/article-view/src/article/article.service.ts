import { Injectable, Inject } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { Article } from "./entities/article.entity";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  async findOne(id: number) {
    return await this.entityManager.findOneBy(Article, { id });
  }

  async view(id: number, userId: string) {
    const res = await this.redisService.hashGet(`article_${id}`);
    if (res.viewCount === undefined) {
      const article = (await this.findOne(id)) as Article;
      article && article.viewCount++;
      await this.entityManager.update(
        Article,
        { id },
        { viewCount: article.viewCount },
      );

      await this.redisService.hashSet(`article_${id}`, {
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        collectCount: article.collectCount,
      });

      // 记录用户阅读记录, 1分钟内刷新只能算阅读一次
      await this.redisService.set(`user_${userId}_view_${id}`, "1", 60);

      return article.viewCount;
    } else {
      // 检查用户是否已阅读过该文章
      const flag = await this.redisService.get(`user_${userId}_view_${id}`);
      if (flag === "1") {
        return +res.viewCount;
      }

      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        viewCount: +res.viewCount + 1,
      });
      // 记录用户阅读记录
      await this.redisService.set(`user_${userId}_view_${id}`, "1", 60);

      return +res.viewCount + 1;
    }
  }

  async flushRedisToDB() {
    const keys = await this.redisService.keys("article_*");
    // console.log(keys);
    for (const key of keys) {
      const res = await this.redisService.hashGet(key);
      const [_, id] = key.split("_");
      await this.entityManager.update(
        Article,
        { id: +id },
        {
          viewCount: +res.viewCount,
        },
      );
    }
  }
}

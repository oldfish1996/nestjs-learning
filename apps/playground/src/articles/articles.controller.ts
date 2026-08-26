import { Controller, Get, Query, Param, Post, Body } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleBody } from "./articles.types";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(@Query("keyword") keyword?: string) {
    return this.articlesService.findAll(keyword);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.articlesService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateArticleBody) {
    return this.articlesService.create(body);
  }
}

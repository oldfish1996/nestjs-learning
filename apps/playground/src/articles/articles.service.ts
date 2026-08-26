import { Injectable, NotFoundException } from "@nestjs/common";
import { Article, CreateArticleBody } from "./articles.types";

@Injectable()
export class ArticlesService {
  private nextId = 3;

  private articles: Article[] = [
    { id: 1, title: "Article 1", content: "Content 1" },
    { id: 2, title: "Article 2", content: "Content 2" },
  ];

  findAll(keyword?: string) {
    if (!keyword) {
      return this.articles;
    }
    const normalizedKeyword = keyword.trim().toLowerCase();
    return this.articles.filter((article) =>
      article.title.toLowerCase().includes(normalizedKeyword),
    );
  }

  findOne(id: number) {
    const article = this.articles.find((article) => article.id === id);

    if (!article) {
      throw new NotFoundException(`Article ${id} not found`);
    }

    return article;
  }

  create(body: CreateArticleBody) {
    const article: Article = {
      id: this.nextId,
      title: body.title,
      content: body.content,
    };
    this.nextId += 1;
    this.articles.push(article);
    return article;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleViewService {
  getHello(): string {
    return 'Hello World!';
  }
}

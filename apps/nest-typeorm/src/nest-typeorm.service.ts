import { Injectable } from '@nestjs/common';

@Injectable()
export class NestTypeormService {
  getHello(): string {
    return 'Hello World!';
  }
}

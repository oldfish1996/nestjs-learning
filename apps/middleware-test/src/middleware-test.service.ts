import { Injectable } from '@nestjs/common';

@Injectable()
export class MiddlewareTestService {
  getHello(): string {
    return 'Hello World!';
  }
}

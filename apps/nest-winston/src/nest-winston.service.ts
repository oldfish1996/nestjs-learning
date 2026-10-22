import { Injectable } from '@nestjs/common';

@Injectable()
export class NestWinstonService {
  getHello(): string {
    return 'Hello World!';
  }
}

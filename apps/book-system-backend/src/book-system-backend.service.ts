import { Injectable } from '@nestjs/common';

@Injectable()
export class BookSystemBackendService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class SingleTokenRefreshService {
  getHello(): string {
    return 'Hello World!';
  }
}

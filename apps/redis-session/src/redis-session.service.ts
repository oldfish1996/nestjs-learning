import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisSessionService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class NestJwtService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class NestMulterService {
  getHello(): string {
    return 'Hello World!';
  }
}

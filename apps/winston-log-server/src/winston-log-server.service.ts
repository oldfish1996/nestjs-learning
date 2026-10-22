import { Injectable } from '@nestjs/common';

@Injectable()
export class WinstonLogServerService {
  getHello(): string {
    return 'Hello World!';
  }
}

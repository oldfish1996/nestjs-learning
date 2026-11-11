import { Injectable } from '@nestjs/common';

@Injectable()
export class NginxTestService {
  getHello(): string {
    return 'Hello World!';
  }
}

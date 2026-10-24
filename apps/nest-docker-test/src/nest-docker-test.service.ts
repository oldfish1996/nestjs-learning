import { Injectable } from '@nestjs/common';

@Injectable()
export class NestDockerTestService {
  getHello(): string {
    return 'Hello World!';
  }
}

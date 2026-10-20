import { Injectable } from '@nestjs/common';

@Injectable()
export class VersionTestService {
  getHello(): string {
    return 'Hello World!';
  }
}

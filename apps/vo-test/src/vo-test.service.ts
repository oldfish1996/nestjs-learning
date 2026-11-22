import { Injectable } from '@nestjs/common';

@Injectable()
export class VoTestService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AclTestService {
  getHello(): string {
    return 'Hello World!';
  }
}

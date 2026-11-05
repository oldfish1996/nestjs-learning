import { Injectable } from '@nestjs/common';

@Injectable()
export class RbcaService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class PassportService {
  getHello(): string {
    return 'Hello World!';
  }
}

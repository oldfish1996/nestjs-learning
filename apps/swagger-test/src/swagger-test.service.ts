import { Injectable } from '@nestjs/common';

@Injectable()
export class SwaggerTestService {
  getHello(): string {
    return 'Hello World!';
  }
}

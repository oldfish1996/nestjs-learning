import { Injectable } from '@nestjs/common';

@Injectable()
export class SerializerInterceptorService {
  getHello(): string {
    return 'Hello World!';
  }
}

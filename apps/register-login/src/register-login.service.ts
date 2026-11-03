import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterLoginService {
  getHello(): string {
    return 'Hello World!';
  }
}

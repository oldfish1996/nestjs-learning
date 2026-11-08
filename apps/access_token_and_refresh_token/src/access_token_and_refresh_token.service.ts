import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokenAndRefreshTokenService {
  getHello(): string {
    return 'Hello World!';
  }
}

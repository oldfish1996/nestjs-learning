import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello NestJS learner!',
      nextStep: 'Try GET /users',
    };
  }

  getHealth(userAgent?: string) {
    return {
      status: 'ok',
      userAgent: userAgent ?? 'unknown',
      timestamp: new Date().toISOString(),
    };
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class FastifyTestService {
  getHello(): string {
    return 'Fastify test!';
  }
}

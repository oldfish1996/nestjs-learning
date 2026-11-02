import { Controller, Get } from '@nestjs/common';
import { NestRedisTestService } from './nest-redis-test.service';

@Controller()
export class NestRedisTestController {
  constructor(private readonly nestRedisTestService: NestRedisTestService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.nestRedisTestService.getHello();
  }
}

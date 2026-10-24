import { Controller, Get } from '@nestjs/common';
import { NestDockerTestService } from './nest-docker-test.service';

@Controller()
export class NestDockerTestController {
  constructor(private readonly nestDockerTestService: NestDockerTestService) {}

  @Get()
  getHello(): string {
    return this.nestDockerTestService.getHello();
  }
}

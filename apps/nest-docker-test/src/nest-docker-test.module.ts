import { Module } from '@nestjs/common';
import { NestDockerTestController } from './nest-docker-test.controller';
import { NestDockerTestService } from './nest-docker-test.service';

@Module({
  imports: [],
  controllers: [NestDockerTestController],
  providers: [NestDockerTestService],
})
export class NestDockerTestModule {}

import { Module } from '@nestjs/common';
import { FastifyTestController } from './fastify-test.controller';
import { FastifyTestService } from './fastify-test.service';

@Module({
  imports: [],
  controllers: [FastifyTestController],
  providers: [FastifyTestService],
})
export class FastifyTestModule {}

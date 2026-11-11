import { Module } from '@nestjs/common';
import { NginxTestController } from './nginx-test.controller';
import { NginxTestService } from './nginx-test.service';

@Module({
  imports: [],
  controllers: [NginxTestController],
  providers: [NginxTestService],
})
export class NginxTestModule {}

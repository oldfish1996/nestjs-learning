import { Module } from '@nestjs/common';
import { VersionTestController } from './version-test.controller';
import { VersionTestService } from './version-test.service';
import { AaaModule } from './aaa/aaa.module';

@Module({
  imports: [AaaModule],
  controllers: [VersionTestController],
  providers: [VersionTestService],
})
export class VersionTestModule {}

import { Module } from '@nestjs/common';
import { VoTestController } from './vo-test.controller';
import { VoTestService } from './vo-test.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [VoTestController],
  providers: [VoTestService],
})
export class VoTestModule {}

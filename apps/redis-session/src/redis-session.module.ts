import { Module } from '@nestjs/common';
import { RedisSessionController } from './redis-session.controller';
import { RedisSessionService } from './redis-session.service';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [RedisModule, SessionModule],
  controllers: [RedisSessionController],
  providers: [RedisSessionService],
})
export class RedisSessionModule {}

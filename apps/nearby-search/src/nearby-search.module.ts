import { Module } from '@nestjs/common';
import { NearbySearchController } from './nearby-search.controller';
import { NearbySearchService } from './nearby-search.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [NearbySearchController],
  providers: [NearbySearchService],
})
export class NearbySearchModule {}

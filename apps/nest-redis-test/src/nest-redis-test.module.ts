import { Module } from "@nestjs/common";
import { NestRedisTestController } from "./nest-redis-test.controller";
import { NestRedisTestService } from "./nest-redis-test.service";
import { createClient } from "redis";

@Module({
  imports: [],
  controllers: [NestRedisTestController],
  providers: [
    NestRedisTestService,
    {
      provide: "REDIS_CLIENT",
      async useFactory() {
        const client = createClient({
          socket: {
            host: "localhost",
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class NestRedisTestModule {}

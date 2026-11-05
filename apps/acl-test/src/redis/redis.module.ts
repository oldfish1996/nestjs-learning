import { Global, Module } from "@nestjs/common";
import { createClient } from "redis";
import { RedisService } from "./redis.service";

@Global()
@Module({
  exports: [RedisService],
  providers: [
    RedisService,
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
export class RedisModule {}

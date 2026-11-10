import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { createClient } from "redis";
import { AaaModule } from "./aaa/aaa.module";
import { Aaa } from "./aaa/entities/aaa.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      // host: "localhost",
      // host: "192.168.1.3",
      host: "mysql-container",
      port: 3306,
      username: "root",
      password: "admin",
      database: "docker-compose",
      synchronize: true,
      logging: true,
      entities: [Aaa],
    }),
    AaaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "REDIS_CLIENT",
      async useFactory() {
        const client = createClient({
          socket: {
            // host: "localhost",
            // host: "192.168.1.3",
            host: "redis-container",
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}

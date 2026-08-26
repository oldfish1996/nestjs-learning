import { Module } from "@nestjs/common";
import { GreetingModule } from "../../greeting/greeting.module";
import { AsyncGreetingController } from "./async-greeting.controller";

@Module({
  imports: [
    GreetingModule.registerAsync({
      useFactory: async () => ({
        greeting: process.env.DYNAMIC_GREETING ?? "Hi",
        audience: "async factory dynamic module",
        includeTimestamp: true,
      }),
    }),
  ],
  controllers: [AsyncGreetingController],
})
export class AsyncGreetingFeatureModule {}

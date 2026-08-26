import { Module } from "@nestjs/common";
import { GreetingModule } from "../../greeting/greeting.module";
import { StaticGreetingController } from "./static-greeting.controller";

@Module({
  imports: [
    GreetingModule.register({
      greeting: "Hello",
      audience: "static dynamic module",
    }),
  ],
  controllers: [StaticGreetingController],
})
export class StaticGreetingFeatureModule {}

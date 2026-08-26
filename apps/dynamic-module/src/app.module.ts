import { Module } from "@nestjs/common";
import { AsyncGreetingFeatureModule } from "./features/async-greeting/async-greeting-feature.module";
import { DiagnosticsModule } from "./features/diagnostics/diagnostics.module";
import { StaticGreetingFeatureModule } from "./features/static-greeting/static-greeting-feature.module";
import { RequestIdModule } from "./request-id/request-id.module";
import { AaaModule } from "./aaa/aaa.module";
import { BbbModule } from "./bbb/bbb.module";

@Module({
  imports: [
    RequestIdModule.forRoot({ prefix: "dynamic-lab" }),
    StaticGreetingFeatureModule,
    AsyncGreetingFeatureModule,
    DiagnosticsModule,
    AaaModule.register({ aaa: 1 }),
    BbbModule.forRoot({ bbb: 2 }),
  ],
})
export class AppModule {}

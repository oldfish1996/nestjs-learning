import { Module } from "@nestjs/common";
import { DynamicModuleController } from "./dynamic-module.controller";
import { DynamicModuleService } from "./dynamic-module.service";
import { AaaModule } from "./aaa/aaa.module";
import { BbbModule } from "./bbb/bbb.module";

@Module({
  imports: [
    AaaModule.register({ aaa: "111" }),
    BbbModule.register({ aaa: 123, bbb: "hello" }),
  ],
  controllers: [DynamicModuleController],
  providers: [DynamicModuleService],
})
export class DynamicModuleModule {}

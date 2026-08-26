import { Module } from "@nestjs/common";
import { BbbController } from "./bbb.controller";
import { ConfigurableModuleClass } from "./bbb.module-definition";

@Module({
  controllers: [BbbController],
})
export class BbbModule extends ConfigurableModuleClass {}

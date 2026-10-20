import { Module } from "@nestjs/common";
import { AaaService } from "./aaa.service";
import { AaaController } from "./aaa.controller";
import { AaaV2Controller } from "./aaa-v2.controller";

@Module({
  // 顺序很重要，前面的先生效，后面的是保底
  controllers: [AaaV2Controller, AaaController],
  providers: [AaaService],
})
export class AaaModule {}

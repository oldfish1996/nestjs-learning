import { Module, forwardRef } from "@nestjs/common";
import { MbModule } from "../mb/mb.module";

@Module({
  imports: [forwardRef(() => MbModule)],
})
export class MaModule {}

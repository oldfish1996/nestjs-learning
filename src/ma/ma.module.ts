import { Module, forwardRef } from "@nestjs/common";
import { MbModule } from "src/mb/mb.module";

@Module({
  imports: [forwardRef(() => MbModule)],
})
export class MaModule {}

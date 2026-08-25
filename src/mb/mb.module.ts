import { Module, forwardRef } from "@nestjs/common";
import { MaModule } from "src/ma/ma.module";

@Module({
  imports: [forwardRef(() => MaModule)],
})
export class MbModule {}

import { Module, Global } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { AppLifecycleService } from "./app-lifecycle.service";

@Global()
@Module({
  providers: [LoggerService, AppLifecycleService],
  exports: [LoggerService],
})
export class CommonModule {}

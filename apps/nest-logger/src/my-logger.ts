import {
  LoggerService,
  LogLevel,
  ConsoleLogger,
  Inject,
  Injectable,
} from "@nestjs/common";
import { NestLoggerService } from "./nest-logger.service";

export class MyLogger implements LoggerService {
  log(message: string, context?: string) {
    console.log("----my-loger----", message, context);
  }

  error(message: string, context?: string) {
    console.error("----my-loger----", message, context);
  }

  warn(message: string, context?: string) {
    console.warn("----my-loger----", message, context);
  }
}

@Injectable()
export class MyLogger2 extends ConsoleLogger {
  @Inject(NestLoggerService)
  private nestLoggerService: NestLoggerService;

  log(message: string, context?: string) {
    console.log("----my-loger2----", message, context);
    this.nestLoggerService.aaa();
  }
}

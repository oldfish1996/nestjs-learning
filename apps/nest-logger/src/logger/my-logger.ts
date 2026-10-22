import { Injectable, LoggerService } from "@nestjs/common";

@Injectable()
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

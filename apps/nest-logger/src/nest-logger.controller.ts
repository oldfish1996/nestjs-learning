import { Controller, Get, Logger, ConsoleLogger } from "@nestjs/common";
import { NestLoggerService } from "./nest-logger.service";

@Controller()
export class NestLoggerController {
  private logger = new Logger(NestLoggerController.name);

  constructor(private readonly nestLoggerService: NestLoggerService) {}

  @Get()
  getHello(): string {
    this.logger.log("getHello");
    this.logger.error("getHello");
    this.logger.warn("getHello");
    this.logger.debug("getHello");
    this.logger.verbose("getHello");
    return this.nestLoggerService.getHello();
  }
}

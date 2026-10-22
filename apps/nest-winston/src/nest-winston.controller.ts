import { Controller, Inject, Get } from "@nestjs/common";
import { NestWinstonService } from "./nest-winston.service";
import { MyLogger } from "./my-logger";
import { WINSTON_LOGGER } from "./winston/winston.module";

@Controller()
export class NestWinstonController {
  // private readonly logger = new MyLogger();

  // 改成 inject 的方式，始终使用同一个实例，性能更好
  @Inject(WINSTON_LOGGER)
  private readonly logger: MyLogger;

  constructor(private readonly nestWinstonService: NestWinstonService) {}

  @Get()
  getHello(): string {
    this.logger.log("getHello", NestWinstonController.name);
    return this.nestWinstonService.getHello();
  }
}

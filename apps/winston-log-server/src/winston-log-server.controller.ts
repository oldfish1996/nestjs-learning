import { Controller, Get, Post, Body } from "@nestjs/common";
import { WinstonLogServerService } from "./winston-log-server.service";

@Controller()
export class WinstonLogServerController {
  constructor(
    private readonly winstonLogServerService: WinstonLogServerService,
  ) {}

  @Get()
  getHello(): string {
    return this.winstonLogServerService.getHello();
  }


  // 查看 packages/winston-test/src/index.ts 中的 logger
  @Post("log")
  log(@Body() body: any) {
    console.log(body);
    return "success";
  }
}

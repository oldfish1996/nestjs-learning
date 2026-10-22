import { Controller, Inject, Get } from "@nestjs/common";
import { AaaService } from "./aaa.service";
import { MyLogger } from "../logger/my-logger";

@Controller("aaa")
export class AaaController {
  @Inject(MyLogger)
  private readonly logger: MyLogger;

  constructor(private readonly aaaService: AaaService) {}

  @Get()
  findAll() {
    this.logger.log("xxx", AaaController.name);
    return "all";
  }
}

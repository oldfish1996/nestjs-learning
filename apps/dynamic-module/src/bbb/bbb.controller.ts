import { Controller, Get, Inject } from "@nestjs/common";
import { MODULE_OPTIONS_TOKEN } from "./bbb.module-definition";

@Controller("bbb")
export class BbbController {
  @Inject(MODULE_OPTIONS_TOKEN)
  private readonly options: any;

  @Get()
  hello() {
    console.log("BbbController options:", this.options);
    return this.options;
  }
}

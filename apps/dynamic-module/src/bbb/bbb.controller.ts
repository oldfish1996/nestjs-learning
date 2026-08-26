import { Controller, Get, Inject } from "@nestjs/common";
import {
  BbbModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from "./bbb.module-definition";

@Controller("/dynamic/bbb")
export class BbbController {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: BbbModuleOptions,
  ) {}

  @Get()
  findAll() {
    console.log("BBB_OPTIONS:", this.options);
    return {
      message: "dynamic-bbb",
      options: this.options,
    };
  }
}

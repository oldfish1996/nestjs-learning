import { Controller, Get } from "@nestjs/common";
import { AaaService } from "./aaa.service";

@Controller({
  path: "aaa",
  version: "2",
})
export class AaaV2Controller {
  constructor(private readonly aaaService: AaaService) {}
  @Get()
  findAll() {
    return this.aaaService.findAll() + "-v2";
  }
}

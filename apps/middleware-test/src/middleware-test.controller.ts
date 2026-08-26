import { Controller, Get } from "@nestjs/common";
import { MiddlewareTestService } from "./middleware-test.service";

@Controller()
export class MiddlewareTestController {
  constructor(private readonly middlewareTestService: MiddlewareTestService) {}

  @Get("hello")
  getHello(): string {
    return this.middlewareTestService.getHello();
  }

  @Get("aaa")
  aaa() {
    return "aaa";
  }

  @Get("bbb")
  bbb() {
    return "bbb";
  }
}

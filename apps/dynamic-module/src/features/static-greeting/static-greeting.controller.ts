import { Controller, Get } from "@nestjs/common";
import { GreetingService } from "../../greeting/greeting.service";

@Controller("dynamic/static")
export class StaticGreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get()
  getGreeting() {
    return this.greetingService.sayHello();
  }

  @Get("options")
  getOptions() {
    return this.greetingService.getOptions();
  }
}

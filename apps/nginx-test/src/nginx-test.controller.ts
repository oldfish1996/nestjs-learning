import { Controller, Get, Headers } from "@nestjs/common";
import { NginxTestService } from "./nginx-test.service";

@Controller()
export class NginxTestController {
  constructor(private readonly nginxTestService: NginxTestService) {}

  @Get()
  getHello(@Headers() headers: Headers): string {
    console.log('success v2');
    return "Hello World! v2";
  }
}

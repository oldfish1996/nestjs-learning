import { Controller, Get } from "@nestjs/common";
import { AclTestService } from "./acl-test.service";

@Controller()
export class AclTestController {
  constructor(private readonly aclTestService: AclTestService) {}

  @Get()
  getHello(): string {
    return this.aclTestService.getHello();
  }
}

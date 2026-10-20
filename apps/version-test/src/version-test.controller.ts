import { Controller, Get } from '@nestjs/common';
import { VersionTestService } from './version-test.service';

@Controller()
export class VersionTestController {
  constructor(private readonly versionTestService: VersionTestService) {}

  @Get()
  getHello(): string {
    return this.versionTestService.getHello();
  }
}

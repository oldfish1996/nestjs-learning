import { Controller, Get } from '@nestjs/common';
import { VoTestService } from './vo-test.service';

@Controller()
export class VoTestController {
  constructor(private readonly voTestService: VoTestService) {}

  @Get()
  getHello(): string {
    return this.voTestService.getHello();
  }
}

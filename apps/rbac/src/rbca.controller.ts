import { Controller, Get } from '@nestjs/common';
import { RbcaService } from './rbca.service';

@Controller()
export class RbcaController {
  constructor(private readonly rbcaService: RbcaService) {}

  @Get()
  getHello(): string {
    return this.rbcaService.getHello();
  }
}

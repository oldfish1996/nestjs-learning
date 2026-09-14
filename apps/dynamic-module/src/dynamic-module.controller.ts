import { Controller, Get } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';

@Controller()
export class DynamicModuleController {
  constructor(private readonly dynamicModuleService: DynamicModuleService) {}

  @Get()
  getHello(): string {
    return this.dynamicModuleService.getHello();
  }
}

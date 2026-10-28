import { Controller, Get } from '@nestjs/common';
import { NestTypeormService } from './nest-typeorm.service';

@Controller()
export class NestTypeormController {
  constructor(private readonly nestTypeormService: NestTypeormService) {}

  @Get()
  getHello(): string {
    return this.nestTypeormService.getHello();
  }
}

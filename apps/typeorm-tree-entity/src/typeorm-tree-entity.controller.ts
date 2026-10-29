import { Controller, Get } from '@nestjs/common';
import { TypeormTreeEntityService } from './typeorm-tree-entity.service';

@Controller()
export class TypeormTreeEntityController {
  constructor(private readonly typeormTreeEntityService: TypeormTreeEntityService) {}

  @Get()
  getHello(): string {
    return this.typeormTreeEntityService.getHello();
  }
}

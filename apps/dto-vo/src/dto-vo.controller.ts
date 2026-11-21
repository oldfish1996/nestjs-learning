import { Controller, Get } from '@nestjs/common';
import { DtoVoService } from './dto-vo.service';

@Controller()
export class DtoVoController {
  constructor(private readonly dtoVoService: DtoVoService) {}

  @Get()
  getHello(): string {
    return this.dtoVoService.getHello();
  }
}

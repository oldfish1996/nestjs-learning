import { Controller, Get } from '@nestjs/common';
import { NestTypeormMigrationService } from './nest-typeorm-migration.service';

@Controller()
export class NestTypeormMigrationController {
  constructor(private readonly nestTypeormMigrationService: NestTypeormMigrationService) {}

  @Get()
  getHello(): string {
    return this.nestTypeormMigrationService.getHello();
  }
}

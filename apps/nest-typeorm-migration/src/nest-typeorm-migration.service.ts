import { Injectable } from '@nestjs/common';

@Injectable()
export class NestTypeormMigrationService {
  getHello(): string {
    return 'Hello World!';
  }
}

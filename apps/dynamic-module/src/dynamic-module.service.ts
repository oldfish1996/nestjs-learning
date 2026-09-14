import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamicModuleService {
  getHello(): string {
    return 'Hello World!';
  }
}

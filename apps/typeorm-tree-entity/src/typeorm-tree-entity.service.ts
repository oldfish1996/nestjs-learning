import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormTreeEntityService {
  getHello(): string {
    return 'Hello World!';
  }
}

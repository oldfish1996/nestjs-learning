import { Injectable } from '@nestjs/common';

@Injectable()
export class DtoVoService {
  getHello(): string {
    return 'Hello World!';
  }
}

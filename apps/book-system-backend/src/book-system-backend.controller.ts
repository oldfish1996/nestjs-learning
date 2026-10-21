import { Controller, Get } from '@nestjs/common';
import { BookSystemBackendService } from './book-system-backend.service';

@Controller()
export class BookSystemBackendController {
  constructor(private readonly bookSystemBackendService: BookSystemBackendService) {}

  @Get()
  getHello(): string {
    return this.bookSystemBackendService.getHello();
  }
}

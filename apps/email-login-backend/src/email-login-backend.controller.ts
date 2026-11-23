import { Controller, Get } from '@nestjs/common';
import { EmailLoginBackendService } from './email-login-backend.service';

@Controller()
export class EmailLoginBackendController {
  constructor(private readonly emailLoginBackendService: EmailLoginBackendService) {}

  @Get()
  getHello(): string {
    return this.emailLoginBackendService.getHello();
  }
}

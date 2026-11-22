import { Controller, Get } from '@nestjs/common';
import { SerializerInterceptorService } from './serializer-interceptor.service';

@Controller()
export class SerializerInterceptorController {
  constructor(private readonly serializerInterceptorService: SerializerInterceptorService) {}

  @Get()
  getHello(): string {
    return this.serializerInterceptorService.getHello();
  }
}

import { Module } from '@nestjs/common';
import { SwaggerTestController } from './swagger-test.controller';
import { SwaggerTestService } from './swagger-test.service';

@Module({
  imports: [],
  controllers: [SwaggerTestController],
  providers: [SwaggerTestService],
})
export class SwaggerTestModule {}

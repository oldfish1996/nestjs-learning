import { Module } from '@nestjs/common';
import { NestMulterController } from './nest-multer.controller';
import { NestMulterService } from './nest-multer.service';

@Module({
  imports: [],
  controllers: [NestMulterController],
  providers: [NestMulterService],
})
export class NestMulterModule {}

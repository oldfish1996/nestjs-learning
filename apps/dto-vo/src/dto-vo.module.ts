import { Module } from '@nestjs/common';
import { DtoVoController } from './dto-vo.controller';
import { DtoVoService } from './dto-vo.service';
import { AaaModule } from './aaa/aaa.module';

@Module({
  imports: [AaaModule],
  controllers: [DtoVoController],
  providers: [DtoVoService],
})
export class DtoVoModule {}

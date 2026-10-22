import { Module } from "@nestjs/common";
import { NestLoggerController } from "./nest-logger.controller";
import { NestLoggerService } from "./nest-logger.service";
import { MyLogger2 } from "./my-logger";
import { LoggerModule } from './logger/logger.module';
import { AaaModule } from './aaa/aaa.module';

@Module({
  imports: [LoggerModule, AaaModule],
  controllers: [NestLoggerController],
  providers: [NestLoggerService, MyLogger2],
})
export class NestLoggerModule {}

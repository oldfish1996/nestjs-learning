import { Module } from '@nestjs/common';
import { WinstonLogServerController } from './winston-log-server.controller';
import { WinstonLogServerService } from './winston-log-server.service';

@Module({
  imports: [],
  controllers: [WinstonLogServerController],
  providers: [WinstonLogServerService],
})
export class WinstonLogServerModule {}

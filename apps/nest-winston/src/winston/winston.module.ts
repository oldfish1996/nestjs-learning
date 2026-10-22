import { Module, DynamicModule, Global } from "@nestjs/common";
import { LoggerOptions } from "winston";
import { MyLogger } from "../my-logger";

export const WINSTON_LOGGER = 'WINSTON_LOGGER';

@Global()
@Module({})
export class WinstonModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_LOGGER,
          useValue: new MyLogger(options),
        },
      ],
      exports: [WINSTON_LOGGER],
    };
  }
}

import { DynamicModule, Global, Module } from "@nestjs/common";
import { RequestIdModuleOptions } from "./request-id-options.interface";
import { RequestIdService } from "./request-id.service";
import { REQUEST_ID_OPTIONS } from "./request-id.tokens";

@Global()
@Module({})
export class RequestIdModule {
  static forRoot(options: RequestIdModuleOptions): DynamicModule {
    return {
      module: RequestIdModule,
      providers: [
        {
          provide: REQUEST_ID_OPTIONS,
          useValue: options,
        },
        RequestIdService,
      ],
      exports: [RequestIdService],
    };
  }
}

import { DynamicModule, Module, Provider } from "@nestjs/common";
import {
  GreetingModuleAsyncOptions,
  GreetingModuleOptions,
} from "./greeting-options.interface";
import { GreetingService } from "./greeting.service";
import { GREETING_OPTIONS } from "./greeting.tokens";

@Module({})
export class GreetingModule {
  static register(options: GreetingModuleOptions): DynamicModule {
    return {
      module: GreetingModule,
      providers: [
        {
          provide: GREETING_OPTIONS,
          useValue: options,
        },
        GreetingService,
      ],
      exports: [GreetingService],
    };
  }

  static registerAsync(options: GreetingModuleAsyncOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: GREETING_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject ?? [],
    };

    return {
      module: GreetingModule,
      imports: options.imports ?? [],
      providers: [optionsProvider, GreetingService],
      exports: [GreetingService],
    };
  }
}

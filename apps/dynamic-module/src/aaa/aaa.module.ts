import { Module, DynamicModule } from "@nestjs/common";
import { AaaService } from "./aaa.service";
import { AaaController } from "./aaa.controller";

@Module({})
export class AaaModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: AaaModule,
      controllers: [AaaController],
      providers: [
        {
          provide: "AAA_OPTIONS",
          useValue: options,
        },
        AaaService,
      ],
      exports: [],
    };
  }
}

import { Module, DynamicModule } from "@nestjs/common";
import { AaaService } from "./aaa.service";
import { AaaController } from "./aaa.controller";

@Module({
  // controllers: [AaaController],
  // providers: [AaaService],
})
export class AaaModule {
  static register(options: Record<string, string>): DynamicModule {
    return {
      module: AaaModule,
      controllers: [AaaController],
      exports: [],
      providers: [
        {
          provide: "AAA_OPTIONS",
          useValue: options,
        },
        AaaService,
      ],
    };
  }
}

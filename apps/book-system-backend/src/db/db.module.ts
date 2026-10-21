import { Module, DynamicModule } from "@nestjs/common";
import { DbService } from "./db.service";

export interface DbModuleOptions {
  path: string;
}

@Module({
  providers: [DbService],
})
export class DbModule {
  static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        DbService,
        {
          provide: "OPTIONS",
          useValue: options,
        },
      ],
      exports: [DbService],
    };
  }
}

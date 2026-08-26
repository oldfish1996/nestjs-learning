import { ModuleMetadata } from "@nestjs/common";

export interface GreetingModuleOptions {
  greeting: string;
  audience: string;
  includeTimestamp?: boolean;
}

export interface GreetingModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<GreetingModuleOptions> | GreetingModuleOptions;
}

import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface BbbModuleOptions {
  aaa: number;
  bbb: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<BbbModuleOptions>().build();

import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface BbbModuleOptions {
  bbb: number;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<BbbModuleOptions>()
    .setClassMethodName("forRoot")
    .build();

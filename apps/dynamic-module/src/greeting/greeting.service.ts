import { Inject, Injectable } from "@nestjs/common";
import { GreetingModuleOptions } from "./greeting-options.interface";
import { GREETING_OPTIONS } from "./greeting.tokens";

@Injectable()
export class GreetingService {
  constructor(
    @Inject(GREETING_OPTIONS)
    private readonly options: GreetingModuleOptions,
  ) {}

  sayHello() {
    const message = `${this.options.greeting}, ${this.options.audience}!`;

    if (!this.options.includeTimestamp) {
      return { message };
    }

    return {
      message,
      generatedAt: new Date().toISOString(),
    };
  }

  getOptions() {
    return this.options;
  }
}

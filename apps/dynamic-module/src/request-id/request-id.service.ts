import { Inject, Injectable } from "@nestjs/common";
import { RequestIdModuleOptions } from "./request-id-options.interface";
import { REQUEST_ID_OPTIONS } from "./request-id.tokens";

@Injectable()
export class RequestIdService {
  private count = 0;

  constructor(
    @Inject(REQUEST_ID_OPTIONS)
    private readonly options: RequestIdModuleOptions,
  ) {}

  next() {
    this.count += 1;
    return `${this.options.prefix}-${this.count}`;
  }
}

import { Controller, Get } from "@nestjs/common";
import { RequestIdService } from "../../request-id/request-id.service";

@Controller("dynamic/diagnostics")
export class DiagnosticsController {
  constructor(private readonly requestIdService: RequestIdService) {}

  @Get("request-id")
  getRequestId() {
    return {
      requestId: this.requestIdService.next(),
    };
  }
}

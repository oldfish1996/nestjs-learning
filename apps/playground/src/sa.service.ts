import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { SbService } from "./sb.service";

@Injectable()
export class SaService {
  constructor(@Inject(forwardRef(() => SbService)) private sb: SbService) {}

  sa() {
    return "sa";
  }

  ssaa(): string {
    return this.sb.ssbb() + "sa";
  }
}

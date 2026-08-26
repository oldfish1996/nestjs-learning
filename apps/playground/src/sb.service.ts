import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { SaService } from "./sa.service";

@Injectable()
export class SbService {
  constructor(@Inject(forwardRef(() => SaService)) private sa: SaService) {}

  sb() {
    return "sb";
  }

  ssbb(): string {
    return this.sa.ssaa() + "sb";
  }
}

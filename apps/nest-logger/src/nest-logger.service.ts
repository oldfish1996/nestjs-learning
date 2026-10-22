import { Injectable } from "@nestjs/common";

@Injectable()
export class NestLoggerService {
  getHello(): string {
    return "Hello World!";
  }

  aaa() {
    console.log("----aaa----");
  }
}

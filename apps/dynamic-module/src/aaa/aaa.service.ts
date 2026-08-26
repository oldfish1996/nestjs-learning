import { Injectable } from "@nestjs/common";

@Injectable()
export class AaaService {
  findAll() {
    return `dynamic-aaa`;
  }
}

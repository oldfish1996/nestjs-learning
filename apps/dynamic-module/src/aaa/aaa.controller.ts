import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from "@nestjs/common";
import { AaaService } from "./aaa.service";

@Controller("/dynamic/aaa")
export class AaaController {
  constructor(
    private readonly aaaService: AaaService,
    @Inject("AAA_OPTIONS") private readonly options: Record<string, any>,
  ) {}

  @Get()
  findAll() {
    console.log("AAA_OPTIONS:", this.options);
    return this.aaaService.findAll();
  }
}

import { Controller, Get, Query, Param, Post, Body } from "@nestjs/common";
import { SwaggerTestService } from "./swagger-test.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller()
export class SwaggerTestController {
  constructor(private readonly swaggerTestService: SwaggerTestService) {}

  @Get()
  getHello(): string {
    return this.swaggerTestService.getHello();
  }

  @ApiOperation({ summary: "测试aaa接口", description: "aaa接口的描述" })
  @Get("aaa")
  aaa(@Query("name") name: string) {
    return `aaa ${name}`;
  }

  @Get("bbb/:id")
  bbb(@Param("id") id: string) {
    return `bbb ${id}`;
  }

  @Post("ccc")
  ccc(@Body() body: any) {
    return `ccc ${body}`;
  }
}

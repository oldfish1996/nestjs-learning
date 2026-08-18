import {
  Controller,
  ExecutionContext,
  Get,
  Headers,
  Inject,
  Ip,
  ParseIntPipe,
  Query,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  applyDecorators,
  createParamDecorator,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { LoginGuard } from "./login.guard";
import { TimeInterceptor } from "./time.interceptor";
import { ValidatePipe } from "./validate.pipe";
import { TestFilter } from "./test.filter";
import { DddGuard } from "./ddd.guard";
import { Ddd } from "./ddd.decorator";
import { create } from "domain";
import chalk from "chalk";

// 装饰器合并
export function Union(path: string, role: string) {
  return applyDecorators(Get(path), Ddd(role), UseGuards(DddGuard));
}

// 自定义装饰器
export const myParamDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // console.log(ctx);
    return "myParamDecorator";
  },
);

export const MyHeaders = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLocaleLowerCase()] : request.headers;
  },
);

export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query[key];
  },
);

// Service可以被注入，也可以注入到其他对象，所以用 @Injectable
// Controller只需要被注入，所以单独有一个装饰器
@Controller()
export class AppController {
  // 两种注入方式
  // 构造器注入
  constructor(private readonly appService: AppService) {}

  // 属性注入
  // constructor() {}
  // @Inject("app-service") // token
  // private readonly appService: AppService;

  @Get()
  getHello() {
    console.log("handle...");
    return this.appService.getHello();
  }

  @Get("health")
  getHealth(@Headers("user-agent") userAgent?: string) {
    console.log("health...");
    return this.appService.getHealth(userAgent);
  }

  @Get("aaa")
  @UseGuards(LoginGuard)
  aaa(): string {
    console.log("aaa...");
    return "aaa";
  }

  @Get("bbb")
  @UseInterceptors(TimeInterceptor)
  bbb() {
    console.log("bbb...");
    return "bbb";
  }

  @Get("ccc")
  @UseFilters(TestFilter)
  ccc(@Query("num", ValidatePipe) num: number) {
    return num + 1;
  }

  // @Get("ddd")
  // ddd(
  //   @Headers("Accept") accept: string,
  //   @Headers() headers: Record<string, any>,
  // ) {
  //   console.log(accept, headers);
  //   return "ddd";
  // }

  @Get("ip")
  ip(@Ip() ip: string) {
    return ip;
  }

  // @Get("ddd")
  // @SetMetadata("ddd", "ddd admin")
  // @UseGuards(DddGuard)
  @Union("ddd", "ddd admin")
  ddd() {
    return "ddd";
  }

  @Get("eee")
  eee(
    @myParamDecorator() myParam: string,
    @MyHeaders("x-env") env: string,
    @MyQuery("x", new ParseIntPipe()) x: string,
    @MyQuery("y") y: string,
  ) {
    console.log(`x+1: ${x + 1}`, `y+1: ${y + 1}`);
    console.log(chalk.bgCyan(env));
    return myParam;
  }
}

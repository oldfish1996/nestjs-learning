import {
  Controller,
  Get,
  Headers,
  Inject,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { LoginGuard } from "./login.guard";
import { TimeInterceptor } from "./time.interceptor";
import { ValidatePipe } from "./validate.pipe";
import { TestFilter } from "./test.filter";

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
}

import { Controller, Get, Headers, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

// Service可以被注入，也可以注入到其他对象，所以用 @Injectable
// Controller只需要被注入，所以单独有一个装饰器
@Controller()
export class AppController {
  // 两种注入方式
  // 构造器注入
  // constructor(private readonly appService: AppService) {}

  // 属性注入
  constructor() {}
  @Inject('app-service') // token
  private readonly appService: AppService;

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get("health")
  getHealth(@Headers("user-agent") userAgent?: string) {
    return this.appService.getHealth(userAgent);
  }
}

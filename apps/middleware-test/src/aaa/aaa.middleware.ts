import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { MiddlewareTestService } from "../middleware-test.service";

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  @Inject(MiddlewareTestService)
  private readonly middlewareTestService: MiddlewareTestService;

  use(req: Request, res: Response, next: () => void) {
    console.log("before aaa middleware");
    console.log("====" + this.middlewareTestService.getHello());
    next();
    console.log("after aaa middleware");
  }
}

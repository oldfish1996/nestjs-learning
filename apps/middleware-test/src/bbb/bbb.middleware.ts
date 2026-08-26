import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class BbbMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log("before bbb middleware");
    next();
    console.log("after bbb middleware");
  }
}

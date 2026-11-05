import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

declare module "express-session" {
  interface Session {
    user: {
      username: string;
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.session?.user) {
      throw new UnauthorizedException("user not login");
    }
    return true;
  }
}

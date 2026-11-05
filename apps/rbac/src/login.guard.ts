import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Role } from "./user/entities/role.entity";
import { Reflector } from "@nestjs/core";

declare module "express" {
  interface Request {
    user: {
      username: string;
      roles: Role[];
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject()
  private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const requireLogin = this.reflector.getAllAndOverride<boolean>(
      "require-login",
      [context.getHandler(), context.getClass()],
    );

    if (!requireLogin) {
      return true;
    }

    const authorization = request.header("authorization") || "";

    if (!authorization) {
      throw new UnauthorizedException("用户未登录");
    }

    try {
      const token = authorization.split(" ")[1];
      const data = this.jwtService.verify(token);
      request.user = data.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException("token 失效，请重新登录");
    }
  }
}

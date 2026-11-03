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

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.header("authorization") || "";
    const bearer = authorization.split(" ");
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException("token error");
    }

    const token = bearer[1];
    try {
      const payload = this.jwtService.verify(token);
      (request as any).user = payload.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException("token error");
    }
  }
}

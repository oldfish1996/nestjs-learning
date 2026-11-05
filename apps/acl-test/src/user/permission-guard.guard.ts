import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
// import { Observable } from "rxjs";
import { Request } from "express";
import { UserService } from "./user.service";
import { Reflector } from "@nestjs/core";
import { RedisService } from "../redis/redis.service";

declare module "express-session" {
  interface Session {
    user: {
      username: string;
    };
  }
}

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.session.user;
    if (!user) {
      throw new UnauthorizedException("user not found");
    }

    // redis 缓存用户权限，避免每次查询数据库
    // 从redis中获取用户权限
    let permissions: Array<string> = await this.redisService.listGet(
      `user_${user.username}_permissions`,
    );
    if (!permissions || permissions.length === 0) {
      const founduser = await this.userService.findByUsername(user.username);
      permissions = founduser?.permissions.map((item) => item.name) || [];

      this.redisService.listSet(
        `user_${user.username}_permissions`,
        permissions,
        60 * 30,
      );
    }

    const permission = this.reflector.get<string>(
      "permission",
      context.getHandler(),
    );
    if (permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException("No permission");
    }
  }
}

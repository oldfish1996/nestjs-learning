import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "./user/user.service";
import { Request } from "express";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 因为这个 PermissionGuard 在 LoginGuard 之后调用（在 AppModule 里声明在 LoginGuard 之后），
    // 所以走到这里 request 里就有 user 对象了。
    // 但也不一定，因为 LoginGuard 没有登录也可能放行，所以要判断下 request.user 如果没有，这里也放行。
    if (!request.user) {
      return true;
    }

    const roles = await this.userService.findRolesByIds(
      request.user.roles.map((role) => role.id),
    );

    const permissions = roles.flatMap((role) => role.permissions);

    console.log(permissions);

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      "require-permission",
      [context.getHandler(), context.getClass()],
    );

    console.log(requiredPermissions);

    // 对比权限
    for (let i = 0; i < requiredPermissions.length; i++) {
      const curPermission = requiredPermissions[i];
      const found = permissions.find((p) => p.name === curPermission);
      if (!found) {
        throw new UnauthorizedException("用户没有权限");
      }
    }

    return true;
  }
}

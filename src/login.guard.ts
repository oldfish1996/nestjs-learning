import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import chalk from "chalk";
import { Observable } from "rxjs";
import { AppService } from "./app.service";
import { Role } from "./roles.decorator";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  @Inject(AppService)
  private appService: AppService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(chalk.bgRed("login check"));

    const requiredRoles = this.reflector.get<Role[]>(
      "roles",
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}

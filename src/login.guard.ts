import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from "@nestjs/common";
import chalk from "chalk";
import { Observable } from "rxjs";
import { AppService } from "./app.service";

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(AppService)
  private appService: AppService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(chalk.bgRed("login check"));
    console.log(this.appService.getHello());
    return false;
  }
}

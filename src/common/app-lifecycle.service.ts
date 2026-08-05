import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
} from "@nestjs/common";

@Injectable()
export class AppLifecycleService
  implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy
{
  onModuleInit() {
    console.log("[lifecycle] CommonModule initialized");
  }

  onModuleDestroy() {
    console.log("[lifecycle] CommonModule destroyed");
  }

  onApplicationBootstrap() {
    console.log("[lifecycle] Application bootstrap finished");
  }
}

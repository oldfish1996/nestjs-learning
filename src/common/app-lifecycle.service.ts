import { Injectable, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";

@Injectable()
export class AppLifecycleService implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('[lifecycle] CommonModule initialized');
  }

  onApplicationBootstrap() {
    console.log('[lifecycle] Application bootstrap finished');
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { MiddlewareTestController } from "./middleware-test.controller";
import { MiddlewareTestService } from "./middleware-test.service";
import { AaaMiddleware } from "./aaa/aaa.middleware";
import { BbbMiddleware } from "./bbb/bbb.middleware";

@Module({
  imports: [],
  controllers: [MiddlewareTestController],
  providers: [MiddlewareTestService],
})
export class MiddlewareTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AaaMiddleware, BbbMiddleware)
      .forRoutes({ path: "aaa", method: RequestMethod.GET });
    consumer
      .apply(BbbMiddleware)
      .forRoutes({ path: "bbb", method: RequestMethod.GET });
  }
}

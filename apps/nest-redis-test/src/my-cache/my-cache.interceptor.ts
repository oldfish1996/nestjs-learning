import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
} from "@nestjs/common";
import { Observable, tap, of } from "rxjs";
import { RedisClientType } from "redis";
import { HttpAdapterHost } from "@nestjs/core";

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  @Inject("REDIS_CLIENT")
  private redisClient: RedisClientType;

  // 这个适配器的方法来拿到 requestUrl，也就是 /aaa?a=3 这种
  @Inject(HttpAdapterHost)
  private httpAdapterHost: HttpAdapterHost;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const key = this.httpAdapterHost.httpAdapter.getRequestUrl(request);
    const value = this.redisClient.get(key);
    if (!value) {
      return next.handle().pipe(
        tap((res) => {
          this.redisClient.set(key, res);
        }),
      );
    }
    return of(value);
  }
}

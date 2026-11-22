import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, map } from "rxjs";
import  { ClassTransformOptions } from "class-transformer";
import { CLASS_SERIALIZER_OPTIONS } from "./serialize-options.decorator";
import * as classTransformer from "class-transformer";

function isObject(value: any) {
  return value !== null && typeof value === "object";
}

@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
  @Inject(Reflector)
  protected readonly reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.getContextOptions(context);
    return next
      .handle()
      .pipe(map(
        (res) => 
        this.serialize(res, contextOptions))
      );
  }

  protected getContextOptions(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<ClassTransformOptions>(
      CLASS_SERIALIZER_OPTIONS,
      [context.getClass(), context.getHandler()],
    );
  }

  serialize(
    response: Record<string, any> | Array<Record<string, any>>,
    options: ClassTransformOptions,
  ) {
    if (!isObject(response) || response instanceof StreamableFile) {
      return response;
    }
    return Array.isArray(response)
      ? response.map((item) => this.transformToNewPlain(item, options))
      : this.transformToNewPlain(response, options);
  }

  transformToNewPlain(plain: any, options: ClassTransformOptions) {
    if (!plain) {
      return plain;
    }
    // 转换为普通对象
    const plainObject = classTransformer.instanceToPlain(plain, options);
    return plainObject;
  }
}

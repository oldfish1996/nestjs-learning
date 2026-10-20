import "reflect-metadata";

/*
 * 运行方式：
 *   npx ts-node learning-labs/reflect-metadata-nest.ts
 *
 * 这个文件只演示 Nest 背后的核心思想，不是 Nest 源码。
 * 关键前提在 tsconfig.json 里：
 *   - experimentalDecorators: true  允许使用装饰器
 *   - emitDecoratorMetadata: true    TypeScript 自动补充 design:* 元数据
 */

const MetadataKeys = {
  controllerPath: "mini-nest:controller-path",
  methodPath: "mini-nest:method-path",
  httpMethod: "mini-nest:http-method",
  injectable: "mini-nest:injectable",
} as const;

function print(title: string, value: unknown) {
  console.log(`\n${title}`);
  console.log(value);
}

/*
 * 1. Reflect metadata 是一个“挂在类、属性、方法上的隐藏 Map”
 *
 * defineMetadata(metadataKey, metadataValue, target, propertyKey?)
 *   metadataKey   类似 Map 的 key
 *   metadataValue 要保存的值
 *   target        元数据挂在哪个对象上
 *   propertyKey   可选；有它就表示挂在某个属性/方法上
 */
class PlainUser {}

Reflect.defineMetadata("role", "admin", PlainUser);
Reflect.defineMetadata("format", "email", PlainUser.prototype, "email");

print("1. class metadata", Reflect.getMetadata("role", PlainUser));
print(
  "1. property metadata",
  Reflect.getMetadata("format", PlainUser.prototype, "email"),
);

/*
 * 2. 装饰器本质上就是在声明类/方法/属性时自动执行的函数
 *
 * 下面的 Controller/Get/Injectable 很像 Nest 的同名装饰器：
 * 它们并不直接改变业务逻辑，只是把“这是什么东西”的信息记录到 metadata 里。
 */
function Controller(path: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.controllerPath, path, target);
  };
}

function Get(path: string): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(MetadataKeys.httpMethod, "GET", target, propertyKey);
    Reflect.defineMetadata(MetadataKeys.methodPath, path, target, propertyKey);
  };
}

function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.injectable, true, target);
  };
}

@Injectable()
class UserRepository {
  findNameById(id: number) {
    return `user-${id}`;
  }
}

interface UserProfile {
  id: number;
  name: string;
}

@Injectable()
class UserService {
  /*
   * 开启 emitDecoratorMetadata 后，只要这个类上有装饰器，
   * TypeScript 会额外生成类似下面这样的代码：
   *
   * Reflect.metadata("design:paramtypes", [UserRepository])(UserService)
   *
   * 所以 Nest 可以在运行时知道：
   * UserService 的 constructor 第一个参数需要 UserRepository。
   */
  constructor(private readonly userRepository: UserRepository) {}

  getProfile(id: number): UserProfile {
    return {
      id,
      name: this.userRepository.findNameById(id),
    };
  }
}

@Controller("/users")
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/:id")
  findOne(id: number): UserProfile {
    return this.userService.getProfile(id);
  }
}

/*
 * 3. design:paramtypes：Nest 依赖注入最关键的元数据之一
 *
 * 注意：这里拿到的是“运行时的构造函数”，不是 TypeScript 静态类型。
 * number 在运行时会变成 Number，UserService 在运行时还是 UserService 这个 class。
 *
 * Reflect.getMetadata 的类型声明返回 any，所以真实项目里常常需要自己断言类型。
 */
const serviceParamTypes = Reflect.getMetadata(
  "design:paramtypes",
  UserService,
) as Function[];

const controllerParamTypes = Reflect.getMetadata(
  "design:paramtypes",
  UserController,
) as Function[];

print(
  "3. UserService constructor param types",
  serviceParamTypes.map((type) => type.name),
);

print(
  "3. UserController constructor param types",
  controllerParamTypes.map((type) => type.name),
);

/*
 * 4. design:type / design:returntype / design:paramtypes 也会出现在方法上
 *
 * 对方法来说：
 *   design:type       方法本身的类型，通常是 Function
 *   design:paramtypes 方法参数的运行时构造函数数组
 *   design:returntype 方法返回值的运行时构造函数
 *
 * 局限也很明显：
 *   - string -> String
 *   - number -> Number
 *   - Promise<User> -> Promise
 *   - interface / type alias 运行时不存在，通常只能得到 Object
 */
const methodType = Reflect.getMetadata(
  "design:type",
  UserController.prototype,
  "findOne",
);

const methodParamTypes = Reflect.getMetadata(
  "design:paramtypes",
  UserController.prototype,
  "findOne",
) as Function[];

const methodReturnType = Reflect.getMetadata(
  "design:returntype",
  UserController.prototype,
  "findOne",
);

print("4. findOne method type", methodType.name);
print(
  "4. findOne method param types",
  methodParamTypes.map((type) => type.name),
);
print("4. findOne method return type", methodReturnType.name);

/*
 * 5. 迷你版 Nest Container
 *
 * 真实 Nest 做得复杂得多：模块扫描、作用域、生命周期、循环依赖、provider token 等。
 * 但最核心的动作可以简化成：
 *   1. 读取 constructor 的 design:paramtypes
 *   2. 递归创建这些依赖
 *   3. new 当前 class(...dependencies)
 */
class MiniContainer {
  private readonly instances = new Map<Function, unknown>();

  get<T>(target: new (...args: never[]) => T): T {
    const existing = this.instances.get(target);

    if (existing) {
      return existing as T;
    }

    const dependencies = (
      Reflect.getMetadata("design:paramtypes", target) as Function[] | undefined
    ) ?? [];

    const args = dependencies.map((dependency) => {
      return this.get(dependency as new (...args: never[]) => unknown);
    });

    const instance = new target(...(args as never[]));
    this.instances.set(target, instance);

    return instance;
  }
}

const container = new MiniContainer();
const controller = container.get(UserController);

print("5. call controller.findOne(1)", controller.findOne(1));

/*
 * 6. 迷你版路由扫描
 *
 * Nest 启动时会扫描 Controller：
 *   - 类上的 @Controller("/users") 告诉它 controller 前缀
 *   - 方法上的 @Get("/:id") 告诉它路由和 HTTP method
 *   - 然后把请求交给对应 controller 实例的方法
 */
function scanRoutes(controllerClass: Function) {
  const controllerPath = Reflect.getMetadata(
    MetadataKeys.controllerPath,
    controllerClass,
  );

  const methodNames = Object.getOwnPropertyNames(controllerClass.prototype)
    .filter((name) => name !== "constructor");

  return methodNames
    .map((methodName) => {
      const httpMethod = Reflect.getMetadata(
        MetadataKeys.httpMethod,
        controllerClass.prototype,
        methodName,
      );

      const methodPath = Reflect.getMetadata(
        MetadataKeys.methodPath,
        controllerClass.prototype,
        methodName,
      );

      if (!httpMethod || !methodPath) {
        return undefined;
      }

      return {
        handlerName: methodName,
        method: httpMethod,
        path: `${controllerPath}${methodPath}`,
      };
    })
    .filter((route): route is NonNullable<typeof route> => Boolean(route));
}

print("6. scanned routes", scanRoutes(UserController));

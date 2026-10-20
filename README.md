# NestJS Learning

按学习主题组织的 NestJS 11 + TypeScript monorepo。各应用共享根目录的依赖和配置，可以独立启动。

**以下命令都在仓库根目录执行，不需要进入 `apps/<应用名>`，也无需全局安装 Nest CLI。** `npx nest` 使用项目安装的 CLI。

## 1. 安装与快速启动

```bash
npm install

# 启动主学习沙盒，修改源码后自动重新编译并重启
npm run start:dev
```

启动后访问 http://localhost:3000/health 或 http://localhost:3000/users，按 `Ctrl+C` 停止应用。

## 2. 启动指定应用

通用格式：

```bash
npx nest start <应用名> --watch
```

应用名对应 `nest-cli.json` 中 `projects` 的 key，当前与 `apps/` 下的目录名一致。

| 应用 | 学习内容 | 默认端口 | 开发启动命令 |
| --- | --- | --- | --- |
| `playground` | CRUD、DI、装饰器、请求生命周期 | `3000` | `npx nest start playground --watch` |
| `dynamic-module` | 动态模块、ConfigurableModuleBuilder | `3000` | `npx nest start dynamic-module --watch` |
| `fastify-test` | Fastify 平台适配 | `3003` | `npx nest start fastify-test --watch` |
| `middleware-test` | 中间件执行顺序与路由绑定 | `3004` | `npx nest start middleware-test --watch` |
| `version-test` | 版本控制实验 | `3000` | `npx nest start version-test --watch` |

去掉 `--watch` 就是普通启动。需要调试时：

```bash
npx nest start playground --watch --debug
```

### 同时启动多个应用

每个应用使用一个终端，监听不同端口。当前源码中，`playground` 读取大写的 `PORT`，其他应用读取小写的 `port`，环境变量区分大小写。

以下是 macOS / Linux 的写法：

```bash
# 终端 1
PORT=3000 npx nest start playground --watch

# 终端 2
port=3001 npx nest start dynamic-module --watch

# 终端 3
port=3002 npx nest start version-test --watch
```

## 3. 给指定应用生成代码

**关键是 `--project <应用名>`，简写为 `-p <应用名>`。** 名称和路径相对于该应用的 `src/`，不要再加 `apps/<应用名>/src/` 前缀。

```bash
npx nest g <类型> <名称或相对路径> --project <应用名>
```

`g` 是 `generate` 的简写。建议始终显式指定应用，避免代码生成到默认应用 `playground`。

### 一次生成完整 resource

例如，给 `version-test` 新增订单 CRUD：

```bash
npx nest g resource orders --project version-test

# 等价简写，二选一执行即可
npx nest g res orders -p version-test
```

按交互提示选择：

1. 传输类型选 **REST API**。
2. 是否生成 CRUD 入口选 **Yes**。

生成结构如下（当前配置默认不生成测试文件）：

```text
apps/version-test/src/orders/
├── dto/
│   ├── create-order.dto.ts
│   └── update-order.dto.ts
├── entities/
│   └── order.entity.ts
├── orders.controller.ts
├── orders.module.ts
└── orders.service.ts
```

CLI 会将 `OrdersModule` 导入应用模块，并生成列表、详情、创建、更新、删除的路由骨架。Service、DTO 和 Entity 仍需自行补充业务逻辑、校验和数据存储。

生成后启动：

```bash
port=3002 npx nest start version-test --watch

# 在另一个终端访问
curl http://localhost:3002/orders
```

### 单独生成 module、controller、service

如果只想逐步搭建模块，可以使用下面这组命令。它与上面的 resource 示例是两种替代方式，不要对同名模块重复执行。

```bash
# 先创建模块，CLI 会将它导入应用模块
npx nest g module orders --project version-test

# 再创建控制器和服务，CLI 会注册到就近找到的 OrdersModule
npx nest g controller orders --project version-test
npx nest g service orders --project version-test
```

生成后，在 Controller 中自行通过构造器注入 Service，并编写路由处理逻辑。

### 其他常用生成器

| 类型 | 简写 | 示例 |
| --- | --- | --- |
| resource | `res` | `npx nest g res orders -p version-test` |
| module | `mo` | `npx nest g mo orders -p version-test` |
| controller | `co` | `npx nest g co orders -p version-test` |
| service | `s` | `npx nest g s orders -p version-test` |
| guard | `gu` | `npx nest g gu auth -p version-test` |
| pipe | `pi` | `npx nest g pi validate -p version-test` |
| interceptor | `itc` | `npx nest g itc timing -p version-test` |
| middleware | `mi` | `npx nest g mi logger -p version-test` |
| filter | `f` | `npx nest g f http-exception -p version-test` |
| decorator | `d` | `npx nest g d current-user -p version-test` |
| class | `cl` | `npx nest g cl orders/dto/create-order.dto -p version-test --flat` |

Guard、Pipe、Interceptor、Filter 等生成后，需要自行通过装饰器或全局配置绑定；Middleware 需要在模块的 `configure()` 或入口中注册。

### 常用生成参数

| 参数 | 用途 |
| --- | --- |
| `--project <应用名>` / `-p <应用名>` | 指定目标应用 |
| `--dry-run` / `-d` | 预览将创建和更新的文件，不写入磁盘 |
| `--flat` | 不额外创建同名文件夹 |
| `--no-flat` | 创建同名文件夹 |
| `--spec` | 生成对应测试文件（适用于支持测试的类型） |
| `--no-spec` | 不生成测试文件 |
| `--skip-import` | 跳过自动注册，之后自行修改模块 |

当前 `nest-cli.json` 设置了 `generateOptions.spec: false`。需要测试文件时显式传入 `--spec`。

```bash
# 先预览，确认目标路径后去掉 --dry-run 再执行
npx nest g module payments -p version-test --dry-run

# 嵌套路径：生成到 src/common/guards/auth.guard.ts
npx nest g guard common/guards/auth -p version-test --flat

# 同时生成服务和测试文件
npx nest g service payments -p version-test --spec
```

注意：`-p` 在 `generate` 中表示项目，而在 `start` / `build` 中表示 tsconfig 路径。启动和构建应用时，直接把应用名放在命令后面。

## 4. 新增一个学习应用

在当前仓库生成 app：

```bash
npx nest g app di-test
npx nest start di-test --watch
```

CLI 会创建 `apps/di-test/` 并更新 `nest-cli.json`。依赖继续由根目录统一管理。新应用的端口设置以生成的 `main.ts` 为准，同时运行时注意避免端口冲突。

之后向新应用添加功能：

```bash
npx nest g resource products --project di-test
```

## 5. 构建与测试

```bash
# 构建主沙盒
npm run build

# 构建指定应用
npx nest build version-test
npx nest build dynamic-module

# 构建所有应用
npx nest build --all

# 执行单元测试
npm test

# 监听测试 / 查看覆盖率
npm run test:watch
npm run test:cov

# 只执行 UsersService 测试
npm test -- --runInBand apps/playground/src/users/users.service.spec.ts

# 使用根目录的 E2E 配置
npx jest --config ./test/jest-e2e.json --runInBand
```

当前 `npm run test:e2e` 指向不存在的 `apps/nestjs-learning/test/jest-e2e.json`，请先使用上面的直接调用方式。各应用目录下也有部分 E2E 模板，运行前需要按实际路由和平台适配器调整。

当前已有的 npm 启动与构建脚本：

| 命令 | 行为 |
| --- | --- |
| `npm start` | 普通启动 playground |
| `npm run start:dev` | 监听模式启动 playground |
| `npm run start:playground` | 同上 |
| `npm run build` | 构建 playground |
| `npm run build:playground` | 同上 |
| `npm run start:prod` | 执行 `dist/apps/playground/main`，需先构建 |

其他应用目前没有独立的 npm 启动脚本，使用 `npx nest start <应用名>` 即可。

## 6. 目录与帮助命令

```text
apps/             # 可独立启动的学习应用
libs/shared/      # 预留的共享代码
learning-labs/    # 独立原理实验
docs/             # 学习说明
test/             # 主沙盒 E2E 测试
public/           # 静态资源，需在应用中启用静态资源服务
nest-cli.json     # 应用列表、源码位置、CLI 配置
package.json      # 共享依赖与 npm scripts
```

```bash
# 查看生成器、启动和构建参数
npx nest g --help
npx nest start --help
npx nest build --help

# 运行 Reflect Metadata 原理实验
npx ts-node learning-labs/reflect-metadata-nest.ts
```

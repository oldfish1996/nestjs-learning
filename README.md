# NestJS Learning

> 参考文档：https://my.feishu.cn/wiki/IET2wHzraiqvD6k6fn8cRbz3nDb

这是一个按学习主题组织的 NestJS monorepo/workspace。根目录维护公共依赖和工程配置，每个 `apps/*` 目录都是一个可以独立启动的学习块，方便在同一个仓库里持续叠加 NestJS 的模块、依赖注入、请求生命周期和平台适配实验。

## 项目结构

```txt
apps/
  playground/        # 主学习沙盒：Controller、Service、Module、DI、Guard、Pipe、Filter、Interceptor 等
  dynamic-module/    # Dynamic Module 专题：register、registerAsync、全局模块、自定义 provider token
  fastify-test/      # Fastify 平台适配实验
  middleware-test/   # Middleware 执行顺序和路由绑定实验
libs/
  shared/            # 预留的跨学习块共享代码
docs/
  learning-blocks.md
  week-01-users-api.http
  week-03-learning-plan.xml
  week-03-supplement.xml
learning-labs/
  reflect-metadata-nest.ts
public/
  index.html
```

## 安装

```bash
npm install
```

## 常用命令

```bash
npm run start:dev        # 启动 playground，默认 http://localhost:3000
npm run start:dynamic    # 启动 dynamic-module，默认 http://localhost:3001
npx nest start fastify-test --watch
npx nest start middleware-test --watch

npm run build
npm run build:playground
npm run build:dynamic

npm test
npm run test:watch
npm run test:cov
```

`fastify-test` 默认监听 `3003`，`middleware-test` 默认监听 `3004`。这两个应用当前没有单独的 npm script，可以直接用 Nest CLI 启动。

## Playground

启动：

```bash
npm run start:dev
```

默认端口是 `3000`。常用接口：

```txt
GET    http://localhost:3000/
GET    http://localhost:3000/health

GET    http://localhost:3000/users
GET    http://localhost:3000/users?keyword=ali
GET    http://localhost:3000/users/1
POST   http://localhost:3000/users
PATCH  http://localhost:3000/users/1
DELETE http://localhost:3000/users/1

GET    http://localhost:3000/articles
GET    http://localhost:3000/articles?keyword=Article
GET    http://localhost:3000/articles/1
POST   http://localhost:3000/articles

GET    http://localhost:3000/notes
POST   http://localhost:3000/notes
GET    http://localhost:3000/notes/di-summary

GET    http://localhost:3000/aaa
GET    http://localhost:3000/bbb
GET    http://localhost:3000/ccc?num=1
GET    http://localhost:3000/ddd
GET    http://localhost:3000/eee?x=1&y=hello
GET    http://localhost:3000/ip
```

接口练习清单见 `docs/week-01-users-api.http`。

当前主要学习点：

- 基础结构：`main.ts`、`AppModule`、Controller、Service。
- REST 入参：`@Param()`、`@Query()`、`@Body()`、`@Headers()`、`@Ip()`。
- 功能模块：`UsersModule`、`ArticlesModule`、`NotesModule`。
- 依赖注入：构造器注入、自定义 provider token、模块导入导出、服务复用。
- 全局/共享模块：`ConfigModule`、`CommonModule`、自定义配置 token。
- 请求生命周期：middleware、guard、pipe、filter、interceptor。
- 装饰器：自定义参数装饰器、组合装饰器、元数据和角色标记。
- Session/Express 集成：`express-session`、`NestExpressApplication`。

## Dynamic Module

启动：

```bash
npm run start:dynamic
```

默认端口是 `3001`。常用接口：

```txt
GET http://localhost:3001/dynamic/static
GET http://localhost:3001/dynamic/static/options
GET http://localhost:3001/dynamic/async
GET http://localhost:3001/dynamic/async/options
GET http://localhost:3001/dynamic/diagnostics/request-id
```

看代码顺序和详细说明见 `apps/dynamic-module/README.md`。

当前主要学习点：

- `register()`：同步传入模块配置。
- `registerAsync()`：异步创建模块配置。
- `DynamicModule`：运行时决定 `imports`、`providers`、`exports`。
- 自定义 provider token：用 `Symbol` 降低 token 冲突风险。
- `@Global()`：根模块导入一次，全局复用导出的 provider。
- `ConfigurableModuleBuilder`：通过 `BbbModule` 练习 Nest 提供的动态模块生成方式。

## Fastify Test

启动：

```bash
npx nest start fastify-test --watch
```

默认端口是 `3003`。

```txt
GET http://localhost:3003/
```

这个学习块使用 `@nestjs/platform-fastify` 和 `FastifyAdapter` 创建应用，并在控制器里直接使用 `FastifyRequest`、`FastifyReply`。

## Middleware Test

启动：

```bash
npx nest start middleware-test --watch
```

默认端口是 `3004`。

```txt
GET http://localhost:3004/hello
GET http://localhost:3004/aaa
GET http://localhost:3004/bbb
```

这个学习块用于观察多个 middleware 按路由绑定后的执行顺序：`/aaa` 同时绑定 `AaaMiddleware` 和 `BbbMiddleware`，`/bbb` 只绑定 `BbbMiddleware`。

## 新增学习块

不要重新 `nest new`。在当前仓库里生成新的 app：

```bash
npx nest g app week-02-di
npx nest start week-02-di --watch
```

更多约定见 `docs/learning-blocks.md`。

## 测试

```bash
npm test
```

当前 Jest 配置会扫描 `apps/**/*.spec.ts`，主要覆盖 playground 里的单元测试。E2E 测试文件分别放在根目录 `test/` 和各 app 的 `test/` 目录，可按需要指定对应的 Jest 配置运行。

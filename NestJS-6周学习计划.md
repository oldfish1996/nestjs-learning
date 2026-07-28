# NestJS 6 周学习计划

适用对象：会写前端 UI、了解 Node.js 基础，希望系统掌握 NestJS 并能独立开发后端 API 的工程师。

总目标：6 周后，你应该能够独立设计并实现一个可维护的 NestJS 后端服务，包括 REST API、模块拆分、参数校验、数据库 CRUD、登录鉴权、权限控制、统一异常处理、测试和基础部署。

## 审查结论

这份计划整体合理，适合从前端转向 NestJS 和后端开发。原计划的优点是主线清楚：先掌握 Nest 基础结构，再进入参数校验、数据库、鉴权和工程化。

需要优化的地方主要有 4 个：

- 第 2 周的 `aaa` / `bbb` 模块练习偏抽象，建议改成围绕真实项目拆模块，例如 `users`、`notes`、`common`、`config`。
- 后端基础不能只学 Nest，需要同步补上 HTTP 状态码、REST 语义、错误码、分页规范、数据库关系和 API 文档。
- 测试和异常处理不应全部堆到第 6 周，建议从第 3 周开始就为核心接口补最小测试。
- 最终项目建议从第 1 周就持续演进同一个 `notes-api`，不要每周换一个孤立练习。

优化后的学习策略：每周都交付一个“能运行、能测试、能解释”的项目增量。学习 Nest 的同时，把真实后端开发的 API 设计、数据建模、权限边界、错误处理和部署意识一起练起来。

---

## 总体能力目标

学完后你应该能熟练完成：

- 理解 HTTP 请求 / 响应、状态码和 REST API 设计
- 设计 REST API
- 使用 Controller / Service / Module 组织项目
- 理解依赖注入 DI
- 接收 query、params、body、form-data、文件上传
- 使用 DTO、Pipe、Validation 做参数校验
- 连接数据库，完成 CRUD
- 设计基础表结构和一对多关系
- 登录注册、JWT 鉴权、权限控制
- 统一异常处理、日志、拦截器、中间件
- 生成基础 API 文档
- 编写单元测试和 e2e 测试
- 做一个完整后端项目并部署

---

## 第 1 周：NestJS 基础和项目结构

### 学习目标

知道一个 Nest 项目是怎么跑起来的，理解请求如何从 HTTP 入口进入 Controller，再调用 Service 返回结果。

### 需要掌握

- NestJS 是什么，以及和 Express / Koa 的关系
- HTTP 方法、状态码和 REST 资源设计
- npm scripts / yarn scripts
- `main.ts`
- `AppModule`
- `Controller`
- `Service`
- `Module`
- 路由装饰器：
  - `@Get()`
  - `@Post()`
  - `@Patch()`
  - `@Delete()`
- 参数获取：
  - `@Param()`
  - `@Query()`
  - `@Body()`
  - `@Headers()`

### 推荐练习

启动最终项目 `notes-api`，先实现一个 `users` 模块，提供基础 REST API：

```txt
GET    /users
GET    /users/:id
GET    /users?keyword=alice
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

第一周先不接数据库，用内存数组模拟数据即可。

建议同时约定接口返回习惯：

- 创建成功返回 201
- 查询不存在返回 404
- 参数明显错误返回 400
- 删除成功可以返回 200 或 204，但整个项目要保持一致

### 示例结构

```txt
src/
  users/
    users.module.ts
    users.controller.ts
    users.service.ts
  app.module.ts
  main.ts
```

### 验收标准

- 能解释 `main.ts`、`Module`、`Controller`、`Service` 分别负责什么
- 能从零创建一个模块
- 能写 GET / POST / PATCH / DELETE 接口
- 能使用 `@Param()`、`@Query()`、`@Body()` 接收请求数据
- 能用 Postman、curl 或前端页面测试接口
- 能解释 200、201、204、400、404、500 的常见使用场景

---

## 第 2 周：依赖注入和模块系统

### 学习目标

真正理解 NestJS 的核心：依赖注入 DI 和模块系统。

### 需要掌握

- `@Injectable()`
- 构造函数注入
- `providers`
- `exports`
- `imports`
- `ConfigModule`
- 按业务边界拆模块
- 自定义 provider：
  - `useValue`
  - `useFactory`
  - `useClass`
- 全局模块 `@Global()`
- 模块生命周期：
  - `OnModuleInit`
  - `OnApplicationBootstrap`

### 推荐练习

不要只写 `aaa` / `bbb` 这种玩具模块，建议把第 1 周项目改造成更接近真实项目的结构：

```txt
src/
  users/
    users.module.ts
    users.controller.ts
    users.service.ts
  notes/
    notes.module.ts
    notes.controller.ts
    notes.service.ts
  common/
    constants/
    utils/
  config/
    app.config.ts
```

练习内容：

- 让 `NotesService` 调用 `UsersService`，例如创建 note 前检查 user 是否存在
- 使用 `imports` / `exports` 正常暴露服务
- 尝试把通用配置或常量封装成 provider
- 了解 `@Global()`，但不要在业务模块里滥用
- 在 Module、Service 中加入生命周期日志，观察启动顺序

### 关键理解

NestJS 不是简单把代码按文件夹分开，而是通过 Module 构建依赖图。依赖是否可用，取决于它是否在当前模块作用域内被注册或导入。

真实项目里应优先让模块依赖关系显式清楚。`@Global()` 可以减少导入样板代码，但也会让依赖来源变隐蔽，初学阶段建议少用。

### 验收标准

- 能解释 provider 是什么
- 能解释为什么 Service 可以被 Controller 注入
- 能解释 `imports`、`providers`、`exports` 的区别
- 能写 `useValue` 和 `useFactory`
- 能解释 `@Global()` 的作用和使用风险
- 能画出当前项目的模块依赖关系

---

## 第 3 周：DTO、校验、Pipe 和数据转换

### 学习目标

让接口从“能跑”变成“像正式项目”，具备参数校验、类型转换和输入过滤能力。

### 需要掌握

- DTO 是什么
- `class-validator`
- `class-transformer`
- `ValidationPipe`
- 全局 Pipe
- 参数类型转换
- 自定义 Pipe
- `PartialType`
- `PickType`
- `OmitType`
- Swagger / OpenAPI 基础
- 最小 e2e 测试

### 推荐安装

```bash
yarn add class-validator class-transformer
yarn add @nestjs/swagger swagger-ui-express
```

### 示例 DTO

```ts
import { IsInt, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  age: number;
}
```

### 全局开启校验

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
```

### 需要理解

- 为什么前端传来的 `age` 默认可能是字符串
- `transform: true` 做了什么
- `whitelist: true` 为什么重要
- DTO 和 TypeScript interface 有什么区别
- 为什么运行时校验不能只依赖 TypeScript 类型

### 推荐练习

给第 1 周的 `users` 模块增加：

- `CreateUserDto`
- `UpdateUserDto`
- 创建用户参数校验
- 更新用户参数校验
- 查询分页参数转换
- 自定义 `ParseIdPipe`
- Swagger 文档
- 为创建用户、参数错误、查询不存在 3 个场景补 e2e 测试

### 验收标准

- 传错误类型时接口能返回 400
- 传多余字段时能被自动过滤
- `PATCH /users/:id` 可以复用 `PartialType(CreateUserDto)`
- 能解释 Pipe 在请求生命周期中的位置
- 能通过 `/api-docs` 查看接口文档
- 至少有 3 个 e2e 测试用例能跑通

---

## 第 4 周：数据库和真实 CRUD

### 学习目标

做出一个真正能存数据的 API。

推荐优先学习 Prisma + PostgreSQL。Prisma 对前端工程师比较友好，类型提示好，迁移流程清晰。

### 需要掌握

- ORM 是什么
- Prisma schema
- migration
- model
- relation
- CRUD
- Service 中调用数据库
- 分页、搜索、排序
- 软删除
- 数据唯一约束
- 数据库错误处理

### 推荐项目

把 `notes` 模块接入数据库：

```txt
POST   /notes
GET    /notes
GET    /notes/:id
PATCH  /notes/:id
DELETE /notes/:id
```

字段：

```txt
id
userId
title
content
createdAt
updatedAt
deletedAt
```

### Prisma model 示例

```prisma
model Note {
  id        Int       @id @default(autoincrement())
  userId    Int
  title     String
  content   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  user      User      @relation(fields: [userId], references: [id])
}

model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  name      String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  notes     Note[]
}
```

### 进阶需求

- `GET /notes?page=1&pageSize=10`
- `GET /notes?keyword=nest`
- `GET /notes?sortBy=createdAt&order=desc`
- `DELETE /notes/:id` 不真删，只把 `deletedAt` 设为当前时间
- 创建 note 时必须关联 user
- email 要做唯一约束，并把唯一冲突转换成可读的 409 错误

### 验收标准

- 能完成数据库建表和 migration
- 能用 Service 调用 Prisma 完成 CRUD
- 能做分页查询
- 能做关键词搜索
- 能实现软删除
- 能解释一对多关系：一个 user 有多条 note
- 能处理常见数据库错误，例如唯一键冲突、记录不存在
- 能解释 ORM、model、migration 分别是什么

---

## 第 5 周：登录注册、JWT、权限

### 学习目标

进入后端最常见的业务场景：用户系统、登录态、鉴权和权限控制。

### 需要掌握

- 用户注册
- 密码 hash：`bcrypt`
- 登录
- JWT
- Passport 策略的基本概念
- Guard
- `@UseGuards()`
- 自定义装饰器，例如 `@CurrentUser()`
- 角色权限：
  - `admin`
  - `user`

### 推荐接口

```txt
POST /auth/register
POST /auth/login
GET  /auth/profile
PATCH /auth/password
```

### 改造 notes 模块

- 登录后才能创建 note
- 用户只能看到自己的 note
- 用户只能修改自己的 note
- admin 可以查看所有 note
- admin 可以软删除任意 note

### 推荐结构

```txt
src/
  auth/
    auth.module.ts
    auth.controller.ts
    auth.service.ts
    jwt.strategy.ts
  users/
    users.module.ts
    users.service.ts
  notes/
    notes.module.ts
    notes.controller.ts
    notes.service.ts
  common/
    decorators/
      current-user.decorator.ts
    guards/
      jwt-auth.guard.ts
      roles.guard.ts
```

### 需要理解

- Guard 和 Middleware 的区别
- JWT 放在哪里
- 为什么不能明文存密码
- 后端如何识别当前用户
- 权限控制应该放在 Controller、Guard 还是 Service
- 认证 authentication 和授权 authorization 的区别
- access token 过期时间为什么不能太长

### 验收标准

- 注册时密码不会明文入库
- 登录后能返回 access token
- 携带 token 才能访问受保护接口
- 能通过 `@CurrentUser()` 获取当前用户
- 能限制普通用户只能访问自己的数据
- 能实现 admin 角色权限
- e2e 测试覆盖：未登录被拒绝、普通用户不能访问别人数据、admin 可以访问全部数据

---

## 第 6 周：工程化、测试、部署

### 学习目标

从“会写功能”升级到“会维护项目”。

### 需要掌握

- 配置管理：`@nestjs/config`
- `.env`
- 异常处理：
  - `HttpException`
  - `NotFoundException`
  - 全局 Exception Filter
- Interceptor：
  - 统一响应格式
  - 日志
  - 请求耗时
- Middleware
- 单元测试
- e2e 测试
- seed 数据
- Docker 基础
- Docker Compose
- 生产环境启动命令
- 部署到服务器或云平台

### 推荐改造

给前面完成的 notes 项目增加：

- 统一响应格式
- 统一错误格式
- 请求日志
- `.env`
- 单元测试
- e2e 测试
- Dockerfile
- docker-compose.yml，包含 API 和 PostgreSQL
- seed 脚本，初始化 admin 用户和示例数据
- README，写清楚本地启动、测试和部署步骤

### 推荐最终目录

```txt
src/
  auth/
  users/
  notes/
  common/
    filters/
    interceptors/
    decorators/
    guards/
  prisma/
  app.module.ts
  main.ts
```

### 统一响应示例

```ts
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### 统一错误示例

```ts
{
  "code": 404,
  "message": "User not found",
  "timestamp": "2026-05-24T10:00:00.000Z",
  "path": "/users/1"
}
```

### 验收标准

- 能把配置放到 `.env`
- 能写全局异常过滤器
- 能写响应拦截器
- 能写基础单元测试
- 能写 e2e 测试
- 能用 Docker 启动服务
- 能用 docker compose 一条命令启动 API + PostgreSQL
- 能从 README 重新初始化项目
- 能说明一个请求在 Nest 中经过哪些环节

---

## 推荐学习节奏

每天 1.5 到 2 小时即可：

- 30 分钟：看概念
- 60 分钟：写代码
- 30 分钟：用 Postman / curl / 前端页面测试接口

更推荐的节奏是：

- 周一到周三：学核心概念并完成主功能
- 周四：补异常处理、边界条件和 DTO
- 周五：补测试、整理 API 文档
- 周末：重构目录、写总结、录一遍从零启动流程

每周末做一次小总结：

- 这一周我新增了哪些模块？
- 我能不能不用看教程写一遍？
- 哪些报错我已经能自己定位？
- 这个知识点在真实业务里解决什么问题？

每周都要保留一份可运行状态，不要把“以后再补测试、以后再整理错误处理”留到最后。后端能力的成长很大一部分来自处理边界条件。

---

## 最终实战项目建议

建议 6 周过程中持续打磨同一个项目：`notes-api`。

最终它应该包含：

- 用户注册和登录
- JWT 鉴权
- 用户信息查询
- 笔记 CRUD
- 分页、搜索、排序
- 用户只能管理自己的笔记
- admin 可以查看全部数据
- 参数校验
- 统一响应
- 统一异常处理
- 请求日志
- Prisma + PostgreSQL
- 单元测试和 e2e 测试
- Dockerfile
- docker-compose.yml
- Swagger API 文档
- README

这样学完以后，你不是只“看过 NestJS”，而是真的完整写过一个后端服务。

---

## 优化后的 6 周交付物

如果想更快、更扎实，可以按下面的交付物检查进度：

| 周次 | 交付物 | 关键能力 |
| --- | --- | --- |
| 第 1 周 | 内存版 `users` REST API | Nest 请求链路、Controller、Service、HTTP 基础 |
| 第 2 周 | 拆分 `users`、`notes`、`common`、`config` 模块 | DI、模块边界、provider |
| 第 3 周 | DTO 校验 + Swagger + 最小 e2e 测试 | 输入校验、API 契约、测试意识 |
| 第 4 周 | Prisma + PostgreSQL 版 notes CRUD | 数据建模、migration、真实查询 |
| 第 5 周 | JWT 登录鉴权 + owner/admin 权限 | 认证、授权、安全边界 |
| 第 6 周 | Docker Compose + 测试 + README + 部署 | 工程化、交付能力、维护性 |

最低合格标准：每周结束时项目都能 `yarn start:dev` 跑起来，核心接口能通过 curl 或 e2e 测试验证。

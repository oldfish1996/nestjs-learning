# NestJS 6 周学习计划

适用对象：会写前端 UI、了解 Node.js 基础，希望系统掌握 NestJS 并能独立开发后端 API 的工程师。

总目标：6 周后，你应该能够独立设计并实现一个可维护的 NestJS 后端服务，包括 REST API、模块拆分、参数校验、数据库 CRUD、登录鉴权、权限控制、统一异常处理、测试和基础部署。

---

## 总体能力目标

学完后你应该能熟练完成：

- 设计 REST API
- 使用 Controller / Service / Module 组织项目
- 理解依赖注入 DI
- 接收 query、params、body、form-data、文件上传
- 使用 DTO、Pipe、Validation 做参数校验
- 连接数据库，完成 CRUD
- 登录注册、JWT 鉴权、权限控制
- 统一异常处理、日志、拦截器、中间件
- 编写单元测试和 e2e 测试
- 做一个完整后端项目并部署

---

## 第 1 周：NestJS 基础和项目结构

### 学习目标

知道一个 Nest 项目是怎么跑起来的，理解请求如何从 HTTP 入口进入 Controller，再调用 Service 返回结果。

### 需要掌握

- NestJS 是什么，以及和 Express / Koa 的关系
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

实现一个 `users` 模块，提供基础 REST API：

```txt
GET    /users
GET    /users/:id
GET    /users?keyword=alice
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

第一周先不接数据库，用内存数组模拟数据即可。

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
- 自定义 provider：
  - `useValue`
  - `useFactory`
  - `useClass`
- 全局模块 `@Global()`
- 模块生命周期：
  - `OnModuleInit`
  - `OnApplicationBootstrap`

### 推荐练习

实现两个模块：

```txt
src/
  aaa/
    aaa.module.ts
    aaa.service.ts
  bbb/
    bbb.module.ts
    bbb.service.ts
```

练习内容：

- 让 `BbbService` 调用 `AaaService`
- 使用 `imports` / `exports` 正常暴露服务
- 尝试加上 `@Global()`，观察模块依赖变化
- 在 Module、Service 中加入生命周期日志，观察启动顺序

### 关键理解

NestJS 不是简单把代码按文件夹分开，而是通过 Module 构建依赖图。依赖是否可用，取决于它是否在当前模块作用域内被注册或导入。

### 验收标准

- 能解释 provider 是什么
- 能解释为什么 Service 可以被 Controller 注入
- 能解释 `imports`、`providers`、`exports` 的区别
- 能写 `useValue` 和 `useFactory`
- 能解释 `@Global()` 的作用和使用风险

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

### 推荐安装

```bash
yarn add class-validator class-transformer
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

### 验收标准

- 传错误类型时接口能返回 400
- 传多余字段时能被自动过滤
- `PATCH /users/:id` 可以复用 `PartialType(CreateUserDto)`
- 能解释 Pipe 在请求生命周期中的位置

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
- CRUD
- Service 中调用数据库
- 分页、搜索、排序
- 软删除

### 推荐项目

做一个 `notes` 模块：

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
  title     String
  content   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
}
```

### 进阶需求

- `GET /notes?page=1&pageSize=10`
- `GET /notes?keyword=nest`
- `GET /notes?sortBy=createdAt&order=desc`
- `DELETE /notes/:id` 不真删，只把 `deletedAt` 设为当前时间

### 验收标准

- 能完成数据库建表和 migration
- 能用 Service 调用 Prisma 完成 CRUD
- 能做分页查询
- 能做关键词搜索
- 能实现软删除
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
```

### 改造 notes 模块

- 登录后才能创建 note
- 用户只能看到自己的 note
- 用户只能修改自己的 note
- admin 可以查看所有 note

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

### 验收标准

- 注册时密码不会明文入库
- 登录后能返回 access token
- 携带 token 才能访问受保护接口
- 能通过 `@CurrentUser()` 获取当前用户
- 能限制普通用户只能访问自己的数据
- 能实现 admin 角色权限

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
- Docker 基础
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
- 能说明一个请求在 Nest 中经过哪些环节

---

## 推荐学习节奏

每天 1.5 到 2 小时即可：

- 30 分钟：看概念
- 60 分钟：写代码
- 30 分钟：用 Postman / curl / 前端页面测试接口

每周末做一次小总结：

- 这一周我新增了哪些模块？
- 我能不能不用看教程写一遍？
- 哪些报错我已经能自己定位？
- 这个知识点在真实业务里解决什么问题？

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

这样学完以后，你不是只“看过 NestJS”，而是真的完整写过一个后端服务。


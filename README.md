# NestJS Learning

> 参考文档 https://my.feishu.cn/wiki/IET2wHzraiqvD6k6fn8cRbz3nDb

这是一个按学习块组织的 NestJS 教学项目。仓库使用 Nest monorepo/workspace 结构：每个学习块是一个独立应用，所有学习块共享根目录依赖，避免每次学习新主题都重新 `nest new`。

## 当前进度

- 第 1 周：NestJS 基础和项目结构
- 第 2 周：后续可继续叠加依赖注入和模块系统练习
- 第 3 周：后续可继续叠加 DTO、ValidationPipe 和自定义 Pipe
- Dynamic Module：独立学习块，演示 `register()`、`registerAsync()` 和 `@Global()`

## 启动

```bash
npm install
npm run start:dev
```

启动后访问：

```txt
GET http://localhost:3000/
GET http://localhost:3000/health
GET http://localhost:3000/users
GET http://localhost:3000/users/1
GET http://localhost:3000/users?keyword=ali
POST http://localhost:3000/users
PATCH http://localhost:3000/users/1
DELETE http://localhost:3000/users/1
```

## 第一周目录

```txt
apps/
  playground/
    src/
      app.controller.ts
      app.module.ts
      app.service.ts
      main.ts
      users/
        users.controller.ts
        users.module.ts
        users.service.ts
        users.types.ts
libs/
  shared/
    src/
      index.ts
```

## 新增学习块

不要重新 `nest new`。在当前仓库里生成一个新的 app：

```bash
npx nest g app week-02-di
npx nest start week-02-di --watch
```

更多约定见 `docs/learning-blocks.md`。

## Dynamic Module 学习块

```bash
npm run start:dynamic
```

启动后访问：

```txt
GET http://localhost:3001/dynamic/static
GET http://localhost:3001/dynamic/static/options
GET http://localhost:3001/dynamic/async
GET http://localhost:3001/dynamic/async/options
GET http://localhost:3001/dynamic/diagnostics/request-id
```

源码入口见 `apps/dynamic-module/README.md`。

## 学习重点

- `main.ts`：应用启动入口，创建 Nest 应用并监听端口。
- `AppModule`：根模块，负责组织应用依赖。
- `UsersModule`：用户功能模块，聚合用户控制器和服务。
- `UsersController`：接收 HTTP 请求，读取 Param、Query、Body。
- `UsersService`：处理用户查询、创建、更新和删除逻辑。

## 测试

```bash
npm test
npm run test:e2e
```

接口练习清单在 `docs/week-01-users-api.http`。

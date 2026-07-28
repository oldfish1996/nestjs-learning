# NestJS Learning

> 参考文档 https://my.feishu.cn/wiki/IET2wHzraiqvD6k6fn8cRbz3nDb

这是一个按学习周组织的 NestJS 教学项目。当前已完成第一周代码：理解项目入口、模块、控制器、服务，以及用内存数组实现基础 REST API。

## 当前进度

- 第 1 周：NestJS 基础和项目结构
- 第 2 周：后续可继续叠加依赖注入和模块系统练习
- 第 3 周：后续可继续叠加 DTO、ValidationPipe 和自定义 Pipe

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
```

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

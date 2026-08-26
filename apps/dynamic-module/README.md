# Dynamic Module Lab

这个学习块用于练习 Nest Dynamic Module。

## 启动

```bash
npm run start:dynamic
```

默认端口是 `3001`。

## 接口

```txt
GET http://localhost:3001/dynamic/static
GET http://localhost:3001/dynamic/static/options
GET http://localhost:3001/dynamic/async
GET http://localhost:3001/dynamic/async/options
GET http://localhost:3001/dynamic/diagnostics/request-id
```

## 看代码顺序

1. `src/greeting/greeting.module.ts`
2. `src/greeting/greeting.service.ts`
3. `src/features/static-greeting/static-greeting-feature.module.ts`
4. `src/features/async-greeting/async-greeting-feature.module.ts`
5. `src/request-id/request-id.module.ts`
6. `src/features/diagnostics/diagnostics.controller.ts`

## 对应知识点

- `register()`：同步传入配置，适合简单配置。
- `registerAsync()`：异步创建配置，适合从环境变量、配置服务或远程服务读取配置。
- 自定义 provider token：用 `Symbol` 避免字符串 token 冲突。
- `DynamicModule` 返回值：运行时决定 `imports`、`providers`、`exports`。
- `@Global()`：只在根模块导入一次，其他模块可以直接注入导出的 provider。

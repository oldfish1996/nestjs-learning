# Learning Blocks

这个仓库使用 Nest monorepo/workspace 结构：根目录只维护一份 `package.json`、`package-lock.json` 和依赖，每个学习主题放在一个独立应用里。

## 目录约定

```txt
apps/
  playground/        # 原始学习沙盒
  dynamic-module/    # Dynamic Module 专题
libs/
  shared/            # 多个学习块都要复用的代码
```

## 常用命令

```bash
npm install
npm run start:dev
npm run start:dynamic
npm run build
npm run build:dynamic
npm test
```

## 新增一个学习块

推荐用 Nest CLI 在当前仓库里生成应用，不要再 `nest new`：

```bash
npx nest g app week-02-di
npx nest start week-02-di --watch
```

每个 `apps/<name>` 都有自己的入口、根模块、控制器和测试，可以独立启动、独立实验。它们共享根目录依赖，所以新学习块通常只需要生成代码，不需要重新安装 Nest。

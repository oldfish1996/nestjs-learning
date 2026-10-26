FROM node:22-bookworm-slim AS build

WORKDIR /app

# 先安装依赖，方便复用构建缓存
COPY package.json package-lock.json ./
RUN npm ci

# 复制配置和当前应用
COPY nest-cli.json tsconfig.json ./
COPY apps/nest-docker-test ./apps/nest-docker-test

# 将 TypeScript 编译为 JavaScript
RUN npx nest build nest-docker-test

# 删除开发依赖
RUN npm prune --omit=dev

# 创建最终运行镜像
FROM node:22-bookworm-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

# 在运行阶段安装 PM2；pm2-runtime 会保持前台运行，适用于容器。
RUN npm install -g pm2@6

COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist/apps/nest-docker-test ./dist

USER node
EXPOSE 3000
CMD ["pm2-runtime", "dist/main.js", "--name", "nest-docker-test"]

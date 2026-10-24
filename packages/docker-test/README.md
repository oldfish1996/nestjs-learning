docker build 时，会先解析 .dockerignore，把该忽略的文件忽略掉，然后把剩余文件打包发送给 docker daemon 作为上下文来构建产生镜像。


docker build -t aaa:ddd -f 2.Dockerfile .

| 部分 | 含义 |
|---|---|
| `docker` | 调用 Docker 命令行工具 |
| `build` | 构建镜像 |
| `-t aaa:ddd` | 给镜像命名：`aaa` 是镜像名称，`ddd` 是标签（tag），可用来区分版本 |
| `-f 2.Dockerfile` | 指定使用的 Dockerfile 文件；不写时默认使用构建上下文根目录下的 `Dockerfile` |
| `.` | 指定**当前目录为构建上下文**，提供构建时可使用的本地文件 |

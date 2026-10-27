import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Aaa } from "./entities/Aaa";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost", // 数据库主机地址
  port: 3306, // 数据库端口
  username: "root",
  password: "admin",
  database: "practice", // 数据库名称(database / schema)
  synchronize: true, // 同步数据库实体， 当 database 里没有和 Entity 对应的表的时候，会自动生成建表 sql 语句并执行
  logging: true, // 打印 sql 语句
  entities: [User, Aaa], // 指定有哪些和数据库表对应的entity类
  migrations: [],
  poolSize: 10, // 连接池最大连接数
  subscribers: [], // 订阅者，用于监听数据库事件，如 insert, update, delete 等操作
  extra: {
    authPlugin: "sha256_password",
  },
});

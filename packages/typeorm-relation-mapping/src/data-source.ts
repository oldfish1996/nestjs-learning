import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { IdCard } from "./entities/IdCard";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "typeorm_test",
  synchronize: true,
  logging: true,
  entities: [User, IdCard],
  migrations: [],
  subscribers: [],
  poolSize: 10,
  extra: {
    authPlugin: "sha256_password",
  },
});

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "practice",
  logging: true,
  synchronize: true,
  entities: [User],
  migrations: [],
  subscribers: [],
//   connectorPackage: "mysql2",
  extra: {
    authPlugin: "sha256_password",
  },
});

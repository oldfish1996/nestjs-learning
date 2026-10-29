import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "migration_test",
  synchronize: false,
  logging: true,
  entities: [User],
  migrations: ["./src/migration/**.ts"],
  subscribers: [],
});

import { Module } from "@nestjs/common";
import { NestTypeormMigrationController } from "./nest-typeorm-migration.controller";
import { NestTypeormMigrationService } from "./nest-typeorm-migration.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "./article/article.module";
import { Article } from "./article/entities/article.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "nest-migration-test",
      synchronize: false,
      logging: true,
      entities: [Article],
      // migrations: ["./src/migration/**.ts"],
      subscribers: [],
    }),
    ArticleModule,
  ],
  controllers: [NestTypeormMigrationController],
  providers: [NestTypeormMigrationService],
})
export class NestTypeormMigrationModule {}

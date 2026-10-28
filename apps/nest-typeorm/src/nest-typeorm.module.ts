import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestTypeormController } from "./nest-typeorm.controller";
import { NestTypeormService } from "./nest-typeorm.service";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "typeorm_test",
      entities: [User],
      synchronize: true,
      logging: true,
      poolSize: 10,
    }),
  ],
  controllers: [NestTypeormController],
  providers: [NestTypeormService],
})
export class NestTypeormModule {}

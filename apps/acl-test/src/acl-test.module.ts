import { Module } from "@nestjs/common";
import { AclTestController } from "./acl-test.controller";
import { AclTestService } from "./acl-test.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { Permission } from "./user/entities/permission.entity";
import { AaaModule } from "./aaa/aaa.module";
import { BbbModule } from "./bbb/bbb.module";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "acl_test",
      entities: [User, Permission],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AaaModule,
    BbbModule,
    RedisModule,
  ],
  controllers: [AclTestController],
  providers: [AclTestService],
})
export class AclTestModule {}

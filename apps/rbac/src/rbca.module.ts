import { Module } from "@nestjs/common";
import { RbcaController } from "./rbca.controller";
import { RbcaService } from "./rbca.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { Role } from "./user/entities/role.entity";
import { Permission } from "./user/entities/permission.entity";
import { JwtModule } from "@nestjs/jwt";
import { AaaModule } from "./aaa/aaa.module";
import { BbbModule } from "./bbb/bbb.module";
import { LoginGuard } from "./login.guard";
import { APP_GUARD } from "@nestjs/core";
import { PermissionGuard } from "./permission.guard";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "chenys",
      signOptions: { expiresIn: "7d" },
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "rbac_test",
      synchronize: true,
      logging: true,
      entities: [User, Role, Permission],
    }),
    UserModule,
    AaaModule,
    BbbModule,
  ],
  controllers: [RbcaController],
  providers: [
    RbcaService,
    // 全局登录守卫
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    }
  ],
})
export class RbcaModule {}

import { Module } from "@nestjs/common";
import { RegisterLoginController } from "./register-login.controller";
import { RegisterLoginService } from "./register-login.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "login_test",
      synchronize: true,
      logging: true,
      entities: [User],
    }),
    JwtModule.register({
      global: true,
      secret: "chen",
      signOptions: { expiresIn: "7d" },
    }),
    UserModule,
  ],
  controllers: [RegisterLoginController],
  providers: [RegisterLoginService],
})
export class RegisterLoginModule {}

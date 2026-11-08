import { Module } from "@nestjs/common";
import { GoogleLoginController } from "./google-login.controller";
import { GoogleLoginService } from "./google-login.service";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "google_login",
      synchronize: true,
      logging: true,
      entities: [User],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [GoogleLoginController],
  providers: [GoogleLoginService],
})
export class GoogleLoginModule {}

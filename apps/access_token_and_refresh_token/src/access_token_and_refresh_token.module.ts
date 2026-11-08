import { Module } from "@nestjs/common";
import { AccessTokenAndRefreshTokenController } from "./access_token_and_refresh_token.controller";
import { AccessTokenAndRefreshTokenService } from "./access_token_and_refresh_token.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: "chenys",
      signOptions: { expiresIn: "30m" },
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "refresh_token_test",
      synchronize: true,
      logging: true,
      entities: [User],
    }),
  ],
  controllers: [AccessTokenAndRefreshTokenController],
  providers: [AccessTokenAndRefreshTokenService],
})
export class AccessTokenAndRefreshTokenModule {}

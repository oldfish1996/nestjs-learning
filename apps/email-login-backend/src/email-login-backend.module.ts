import { Module } from "@nestjs/common";
import { EmailLoginBackendController } from "./email-login-backend.controller";
import { EmailLoginBackendService } from "./email-login-backend.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { EmailModule } from "./email/email.module";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "apps/email-login-backend/src/.env",
    }),
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "email_login_test",
      synchronize: true,
      logging: true,
      entities: [User],
    }),
    EmailModule,
    RedisModule,
  ],
  controllers: [EmailLoginBackendController],
  providers: [EmailLoginBackendService],
})
export class EmailLoginBackendModule {}

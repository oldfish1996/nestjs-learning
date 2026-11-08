import { Module } from "@nestjs/common";
import { PassportController } from "./passport.controller";
import { PassportService } from "./passport.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
  imports: [
    AuthModule,
    UserModule,
    JwtModule.register({
      secret: "chenys",
      // signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [PassportController],
  providers: [
    PassportService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class PassportModule {}

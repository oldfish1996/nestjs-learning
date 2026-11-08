import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./local.stategy";
import { JwtStrategy } from "./jwt.stategy";

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

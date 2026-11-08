import { Module } from "@nestjs/common";
import { GoogleStrategy } from "./google.stategy";

@Module({
  providers: [GoogleStrategy],
})
export class AuthModule {}

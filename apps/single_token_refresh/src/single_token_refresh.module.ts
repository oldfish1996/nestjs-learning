import { Module } from '@nestjs/common';
import { SingleTokenRefreshController } from './single_token_refresh.controller';
import { SingleTokenRefreshService } from './single_token_refresh.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: "chenys",
    signOptions: { expiresIn: "7d" },
  })],
  controllers: [SingleTokenRefreshController],
  providers: [SingleTokenRefreshService],
})
export class SingleTokenRefreshModule {}

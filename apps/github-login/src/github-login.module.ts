import { Module } from '@nestjs/common';
import { GithubLoginController } from './github-login.controller';
import { GithubLoginService } from './github-login.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GithubLoginController],
  providers: [GithubLoginService],
})
export class GithubLoginModule {}

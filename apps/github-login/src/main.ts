import { NestFactory } from '@nestjs/core';
import { GithubLoginModule } from './github-login.module';

async function bootstrap() {
  const app = await NestFactory.create(GithubLoginModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { NestJwtController } from './nest-jwt.controller';
import { NestJwtService } from './nest-jwt.service';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({
    secret: "chenys",
    signOptions: { expiresIn: "7d" },
  })],
  controllers: [NestJwtController],
  providers: [NestJwtService],
})
export class NestJwtModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  // 动态模块，这样就可以在service里注入
  imports: [
    TypeOrmModule.forFeature([User]),
  ]
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { SerializerInterceptorController } from './serializer-interceptor.controller';
import { SerializerInterceptorService } from './serializer-interceptor.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SerializerInterceptorController],
  providers: [SerializerInterceptorService],
})
export class SerializerInterceptorModule {}

import { Module } from '@nestjs/common';
import { BookSystemBackendController } from './book-system-backend.controller';
import { BookSystemBackendService } from './book-system-backend.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BookSystemBackendController],
  providers: [BookSystemBackendService],
})
export class BookSystemBackendModule {}

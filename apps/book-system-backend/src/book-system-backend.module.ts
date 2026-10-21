import { Module } from '@nestjs/common';
import { BookSystemBackendController } from './book-system-backend.controller';
import { BookSystemBackendService } from './book-system-backend.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [UserModule, BookModule],
  controllers: [BookSystemBackendController],
  providers: [BookSystemBackendService],
})
export class BookSystemBackendModule {}

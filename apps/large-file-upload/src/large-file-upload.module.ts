import { Module } from '@nestjs/common';
import { LargeFileUploadController } from './large-file-upload.controller';
import { LargeFileUploadService } from './large-file-upload.service';

@Module({
  imports: [],
  controllers: [LargeFileUploadController],
  providers: [LargeFileUploadService],
})
export class LargeFileUploadModule {}

import { Injectable } from '@nestjs/common';

@Injectable()
export class LargeFileUploadService {
  getHello(): string {
    return 'Hello World!';
  }
}

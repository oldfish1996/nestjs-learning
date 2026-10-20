import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
  HttpStatus,
  FileValidator,
} from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (value.size > 1024 * 10) {
      throw new HttpException(
        "file size must be less than 10KB",
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}

// 自定义文件验证器
export class MyFileValidator extends FileValidator {
  constructor(options: Record<string, any>) {
    super(options);
  }

  isValid(file: Express.Multer.File): boolean {
    return file.size <= 1024 * 10;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `文件 ${file.originalname} 大小超出 10KB`;
  }
}

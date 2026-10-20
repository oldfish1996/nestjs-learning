import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common";
import { NestMulterService } from "./nest-multer.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import {
  FileSizeValidationPipe,
  MyFileValidator,
} from "./file-size-validation.pipe";

@Controller()
export class NestMulterController {
  constructor(private readonly nestMulterService: NestMulterService) {}

  @Get()
  getHello(): string {
    return this.nestMulterService.getHello();
  }

  @Post("aaa")
  @UseInterceptors(FileInterceptor("aaa", { dest: "apps/nest-multer/uploads" }))
  uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log("file", file);
    console.log("body", body);
  }

  @Post("bbb")
  @UseInterceptors(
    FilesInterceptor("bbb", 3, { dest: "apps/nest-multer/uploads" }),
  )
  uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ) {
    console.log("files", files);
    console.log("body", body);
  }

  // 单个文件上传，文件大小验证
  @Post("ccc")
  @UseInterceptors(FileInterceptor("ccc", { dest: "apps/nest-multer/uploads" }))
  uploadSingleFileWithValidation(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log("file", file);
    console.log("body", body);
  }

  // nest封装好的内置验证
  @Post("ddd")
  @UseInterceptors(FileInterceptor("ddd", { dest: "apps/nest-multer/uploads" }))
  uploadFile3(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 10 }),
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log("file", file);
    console.log("body", body);
  }

  // 自定义文件验证器
  @Post("eee")
  @UseInterceptors(FileInterceptor("eee", { dest: "apps/nest-multer/uploads" }))
  uploadFile4(
    @UploadedFile(new ParseFilePipe({ validators: [new MyFileValidator({})] }))
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log("file", file);
    console.log("body", body);
  }
}

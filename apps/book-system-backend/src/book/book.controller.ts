import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import * as path from "path";
import { storage } from "./my-storage";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get("list")
  list() {
    return this.bookService.list();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookService.findOne(+id);
  }

  @Post("create")
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put("update")
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.bookService.delete(+id);
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      dest: "apps/book-system-backend/uploads",
      storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        if ([".jpg", ".jpeg", ".png"].includes(extname)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException("Only jpg, jpeg, png files are allowed"),
            false,
          );
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log("file", file);
    return file.path;
  }
}

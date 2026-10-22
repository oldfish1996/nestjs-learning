import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  UploadedFiles,
  Query,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { LargeFileUploadService } from "./large-file-upload.service";
import * as fs from "fs";
import * as path from "path";
import { diskStorage } from "multer";
import { pipeline } from "stream/promises";

const uploadDir = path.resolve("apps/large-file-upload/uploads");

@Controller()
export class LargeFileUploadController {
  constructor(
    private readonly largeFileUploadService: LargeFileUploadService,
  ) {}

  @Get()
  getHello(): string {
    return this.largeFileUploadService.getHello();
  }

  @Post("upload")
  @UseInterceptors(
    FilesInterceptor("files", 20, {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          fs.mkdir(uploadDir, { recursive: true }, (error) => {
            callback(error, uploadDir);
          });
        },
      }),
    }),
  )
  upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ) {
    console.log("files", files);
    console.log("body", body);

    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = path.join(uploadDir, "chunks_" + fileName);

    fs.mkdirSync(chunkDir, { recursive: true });

    fs.cpSync(files[0].path, chunkDir + "/" + body.name);
    fs.rmSync(files[0].path);
  }

  @Get("merge")
  async merge(
    @Query("name") name: string,
    @Query("totalChunks") totalChunks?: string,
  ) {
    if (
      typeof name !== "string" ||
      !name ||
      name === "." ||
      name === ".." ||
      /[/\\\x00]/.test(name)
    ) {
      throw new BadRequestException("文件名不合法");
    }
    const chunkDir = path.join(uploadDir, "chunks_" + name);
    const entries = await fs.promises
      .readdir(chunkDir, { withFileTypes: true })
      .catch((error: NodeJS.ErrnoException) => {
        if (error.code === "ENOENT")
          throw new NotFoundException("分片目录不存在");
        throw error;
      });
    const count =
      totalChunks === undefined ? entries.length : Number(totalChunks);
    if (
      !Number.isSafeInteger(count) ||
      count <= 0 ||
      count !== entries.length
    ) {
      throw new BadRequestException("分片数量不匹配");
    }
    const names = new Set(
      entries.filter((entry) => entry.isFile()).map((entry) => entry.name),
    );
    for (let index = 0; index < count; index++) {
      if (!names.has(`${name}-${index}`))
        throw new BadRequestException(`缺少分片 ${index}`);
    }

    async function* readChunks() {
      for (let index = 0; index < count; index++) {
        yield* fs.createReadStream(path.join(chunkDir, `${name}-${index}`));
      }
    }

    const tempDir = await fs.promises.mkdtemp(path.join(uploadDir, ".merge-"));
    const tempFile = path.join(tempDir, "result");
    try {
      await pipeline(readChunks(), fs.createWriteStream(tempFile));
      const { size } = await fs.promises.stat(tempFile);
      await fs.promises.rename(tempFile, path.join(uploadDir, name));
      await fs.promises.rm(chunkDir, { recursive: true });
      return { name, size, totalChunks: count };
    } finally {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
  }
}

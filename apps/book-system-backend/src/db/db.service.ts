import { Inject, Injectable } from "@nestjs/common";
import { DbModuleOptions } from "./db.module";
import { access, readFile, writeFile } from "fs/promises";

@Injectable()
export class DbService {
  @Inject("OPTIONS")
  options: DbModuleOptions;

  // 读取文件内容转为 JSON 数组
  async read() {
    const filePath = this.options.path;
    try {
      await access(filePath);
    } catch (error) {
      return [];
    }

    const str = await readFile(filePath, "utf-8");

    if (!str) return [];

    return JSON.parse(str);
  }

  // 写入文件内容
  async write(data: Record<string, any>) {
    await writeFile(this.options.path, JSON.stringify(data || []), "utf-8");
  }
}

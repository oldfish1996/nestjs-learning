import { diskStorage } from "multer";
import { join, extname } from "path";
import { mkdirSync } from "fs";

export const uploadDirectory = join(process.cwd(), "apps/book-system-backend/uploads");
mkdirSync(uploadDirectory, { recursive: true });

export const storage = diskStorage({
  destination: uploadDirectory,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${extname(file.originalname).toLowerCase()}`);
  },
});

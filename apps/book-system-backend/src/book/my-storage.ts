import { diskStorage } from "multer";
import { join } from "path";

export const storage = diskStorage({
  destination: join(__dirname, "..", "uploads"),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${file.originalname}-${Date.now()}`);
  },
});

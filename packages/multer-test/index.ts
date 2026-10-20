import express from "express";
import type { ErrorRequestHandler, RequestHandler } from "express";
import multer from "multer";
import cors from "cors";
import { MulterError } from "multer";
import path from "path";

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  // 字符串形式的 destination 会由 Multer 自动创建目录。
  destination: path.join(__dirname, "uploads"),

  filename: (req, file, cb) => {
    const suffix = file.originalname + "-" + new Date().toLocaleTimeString();
    cb(null, file.fieldname + "-" + suffix);
  },
});

const upload = multer({ storage });

const handleUploadError: ErrorRequestHandler = (
  err: unknown,
  req,
  res,
  next,
) => {
  if (err instanceof MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
    res.status(400).end("Too many files uploaded");
    return;
  }
  next(err);
};

const handleMultipleUpload: RequestHandler = (req, res) => {
  console.log("req.files", req.files);
  console.log("req.body", req.body);
  res.json({ files: req.files, body: req.body });
};

// 单个文件上传
// `upload.single("aaa")`  Multer 中间件
// 接收`multipart/form-data` 中字段名为`aaa` 的单个文件，解析后放入`req.file`
app.post("/aaa", upload.single("aaa"), (req, res, next) => {
  console.log("req.file", req.file);
  console.log("req.body", req.body);
  res.json({ file: req.file, body: req.body });
});

// 多个文件上传
// `upload.array("aaa")`  Multer 中间件
// 接收`multipart/form-data` 中字段名为`aaa` 的多个文件，解析后放入`req.files`
app.post(
  "/bbb",
  upload.array("bbb", 2),
  handleMultipleUpload,
  handleUploadError,
);

app.listen(3003);
console.log("🚀 Server is running on port 3003");

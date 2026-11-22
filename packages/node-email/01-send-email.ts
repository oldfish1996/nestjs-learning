import * as nodemailer from "nodemailer";
import * as fs from "fs";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: "2318587805@qq.com",
    subject: "Test Email from Node",
    // text: "Test Email from Node.js",
    html: fs.readFileSync("./test.html", "utf-8"),
  });

  console.log("邮件发送成功", info.messageId);
}

main().catch(console.error);

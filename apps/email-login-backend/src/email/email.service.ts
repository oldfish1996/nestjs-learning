import { Inject, Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: "smtp.qq.com",
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get("MAIL_USER"),
        pass: this.configService.get("MAIL_PASS"),
      },
    });
  }

  async sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    await this.transporter.sendMail({
      from: {
        name: "系统邮件",
        address: this.configService.get("MAIL_USER"),
      },
      to,
      subject,
      html,
    });
  }
}

import Imap from "imap";
import "dotenv/config";

const imap = new Imap({
  user: process.env.MAIL_USER!,
  password: process.env.MAIL_PASS!,
  host: "imap.qq.com",
  port: 993,
  tls: true,
});

imap.once("ready", () => {
  imap.openBox("INBOX", true, (err) => {
    imap.search(
      [["SEEN"], ["SINCE", new Date("2026-11-20 19:00:00").toLocaleString()]],
      (err, res) => {
        if (!err) {
          console.log(res);
        } else {
          throw err;
        }
      },
    );
  });
});

imap.once("error", (err: Error) => {
  console.error("收邮件失败：", err.message);
});

imap.connect();

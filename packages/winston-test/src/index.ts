import winston from "winston";
import "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    // new winston.transports.File({
    //   dirname: "logs",
    //   filename: "test.log",
    //   maxsize: 1024,
    // }),
    // new winston.transports.DailyRotateFile({
    //   level: "info",
    //   dirname: "logs-daily",
    //   filename: "test-%DATE%.log",
    //   maxSize: "1K",
    // }),
    new winston.transports.Http({
      host: "localhost",
      port: 3000,
      path: "/log",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      dirname: "logs",
      filename: "test-exception.log",
      maxsize: 1024,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      dirname: "logs",
      filename: "test-rejection.log",
      maxsize: 1024,
    }),
  ],
});

logger.info("chen");
logger.error("ys");
logger.warn("xxx");
logger.debug("xxx");
logger.verbose("xxx");
logger.silly("xxx");

throw new Error("test");

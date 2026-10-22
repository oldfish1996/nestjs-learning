import { Module } from "@nestjs/common";
import { NestWinstonController } from "./nest-winston.controller";
import { NestWinstonService } from "./nest-winston.service";
import { WinstonModule } from "./winston/winston.module";
import { format, transports } from "winston";
import chalk from "chalk";

const winstonOptions = {
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.printf(({ level, message, context, time }) => {
      const appStr = chalk.green("[NEST]");
      const contextStr = chalk.yellow(`[${context}]`);
      return `${appStr} ${time} ${level} ${contextStr} ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: "apps/nest-winston/logs",
      filename: "log.txt",
      format: format.combine(format.json(), format.timestamp()),
    }),
  ],
};

@Module({
  imports: [WinstonModule, WinstonModule.forRoot(winstonOptions)],
  controllers: [NestWinstonController],
  providers: [NestWinstonService],
})
export class NestWinstonModule {}

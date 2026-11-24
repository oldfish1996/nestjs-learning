import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression, Interval, Timeout } from "@nestjs/schedule";
import { AaaService } from "../aaa/aaa.service";

@Injectable()
export class TaskService {
  @Inject(AaaService)
  private aaaService: AaaService;

  @Cron(CronExpression.EVERY_5_SECONDS, { name: "task1" })
  handleCronJob() {
    console.log("task1 每隔5秒执行一次", this.aaaService.findAll());
  }

  @Interval("task2", 5000)
  handleIntervalJob() {
    console.log("task2 每隔5秒执行一次", this.aaaService.findAll());
  }

  @Timeout("task3", 5000)
  handleTimeoutJob() {
    console.log("task3 5秒后执行", this.aaaService.findAll());
  }
}

import { Inject, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ScheduleTaskController } from "./schedule-task.controller";
import { ScheduleTaskService } from "./schedule-task.service";
import { ScheduleModule, SchedulerRegistry } from "@nestjs/schedule";
import { TaskService } from "./task/task.service";
import { AaaModule } from "./aaa/aaa.module";

@Module({
  imports: [ScheduleModule.forRoot(), AaaModule],
  controllers: [ScheduleTaskController],
  providers: [ScheduleTaskService, TaskService],
})
export class ScheduleTaskModule implements OnApplicationBootstrap {
  @Inject(SchedulerRegistry)
  private schedulerRegistry: SchedulerRegistry;

  onApplicationBootstrap() {
    const crons = this.schedulerRegistry.getCronJobs();
    const intervals = this.schedulerRegistry.getIntervals();
    const timeouts = this.schedulerRegistry.getTimeouts();
    // console.log(crons, intervals, timeouts);

    // 管理定时任务，对它做增删改
    crons.forEach((item, key) => {
      item.stop();
      this.schedulerRegistry.deleteCronJob(key);
    });

    intervals.forEach((item) => {
      const interval = this.schedulerRegistry.getInterval(item);
      clearInterval(interval);
      this.schedulerRegistry.deleteInterval(item);
    });

    timeouts.forEach((item) => {
      const timeout = this.schedulerRegistry.getTimeout(item);
      clearTimeout(timeout);
      this.schedulerRegistry.deleteTimeout(item);
    });
  }
}

import { Controller, Get } from '@nestjs/common';
import { ScheduleTaskService } from './schedule-task.service';

@Controller()
export class ScheduleTaskController {
  constructor(private readonly scheduleTaskService: ScheduleTaskService) {}

  @Get()
  getHello(): string {
    return this.scheduleTaskService.getHello();
  }
}

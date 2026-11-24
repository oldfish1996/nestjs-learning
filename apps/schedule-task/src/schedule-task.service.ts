import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleTaskService {
  getHello(): string {
    return 'Hello World!';
  }
}

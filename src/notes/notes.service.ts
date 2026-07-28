import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Note, CreateNoteBody } from "./notes.type";
import { APP_CONFIG, START_TIME } from "../config/app-config.token";
import { AppConfig } from "../config/app.config";
import { LoggerService } from "../common/logger.service";

@Injectable()
export class NotesService {
  private nextId = 1;
  private notes: Note[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig,
    @Inject(START_TIME) private readonly startTime: string,
  ) {}

  findAll() {
    return this.notes;
  }

  create(body: CreateNoteBody) {
    const user = this.usersService.findOne(Number(body.userId));
    if (!user) {
      this.logger.log(`user not found`);
      throw new NotFoundException("User not found");
    }
    // Create the note
    const note: Note = {
      id: this.nextId,
      userId: user.id,
      title: body.title,
      content: body.content,
      createdAt: new Date().toISOString(),
    };

    this.nextId += 1;
    this.notes.push(note);
    this.logger.log(`created note ${note.id} for user ${user.id}`);
    return note;
  }

  getDiSummary() {
    return {
      config: this.appConfig,
      startTime: this.startTime,
    };
  }
}

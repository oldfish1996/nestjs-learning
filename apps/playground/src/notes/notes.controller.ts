import { Controller, Post, Body, Get } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteBody } from "./notes.type";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Post()
  create(@Body() body: CreateNoteBody) {
    return this.notesService.create(body);
  }

  @Get("di-summary")
  getDiSummary() {
    return this.notesService.getDiSummary();
  }
}

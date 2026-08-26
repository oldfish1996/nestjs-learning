import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { UsersModule } from "../users/users.module";
import { ConfigModule } from "../config/config.module";
// import { CommonModule } from "src/common/common.module";


@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [UsersModule, ConfigModule],
})
export class NotesModule {}

import { CreateAaaDto } from "./create-aaa.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateAaaDto extends PartialType(CreateAaaDto) {}

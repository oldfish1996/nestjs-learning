import { IsNotEmpty } from "class-validator";

export class CreateBookDto {
  @IsNotEmpty({ message: "title is required" })
  title: string;

  @IsNotEmpty({ message: "author is required" })
  author: string;

  @IsNotEmpty({ message: "description is required" })
  description: string;

  @IsNotEmpty({ message: "cover is required" })
  cover: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "t_aaa" })
export class Aaa {
  @PrimaryGeneratedColumn({ comment: "aaa id" })
  id: number;

  @Column({
    name: "aaa",
    type: "text",
    comment: "aaa 字段",
  })
  aaa: string;

  @Column({
    name: "bbb",
    type: "double",
    comment: "bbb 字段",
  })
  bbb: number;

  @Column({
    unique: true,
    nullable: false,
    length: 10,
    type: "varchar",
    default: "cccc",
  })
  ccc: string;
}

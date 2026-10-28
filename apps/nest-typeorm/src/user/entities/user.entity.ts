import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "nt_user",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "nt_name",
    length: 50,
  })
  name: string;
}

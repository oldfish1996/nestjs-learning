import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";

@Entity({
  name: "id_card",
})
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 18,
    comment: "身份证号",
  })
  cardName: string;

  @JoinColumn()
  @OneToOne(() => User, {
    cascade: true, // 告诉 typeorm 当你增删改一个 Entity 的时候，是否级联增删改它关联的 Entity
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}

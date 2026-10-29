import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from "typeorm";

// 不指定名称会把 City转成city
@Entity()
@Tree("closure-table") // 启用闭包表，默认名称是主表名加`_closure`
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column()
  name: string;

  @TreeChildren()
  children: City[];

  @TreeParent()
  parent: City;
}

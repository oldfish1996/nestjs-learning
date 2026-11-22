import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

// 用class-transformer来实现vo的转换，不需要额外的vo类
// import { UserVo } from "./vo/user.vo";

const database: User[] = [];
let id = 0;

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    user.id = ++id;
    database.push(user);
    return user;
  }

  findAll() {
    return database;
  }

  findOne(id: number) {
    const user = database.find((user) => user.id === id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return user;
  }

  remove(id: number) {
    return database.filter((user) => user.id !== id);
  }
}

import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: "chenys",
      password: "111",
    },
    {
      userId: 2,
      username: "wang",
      password: "222",
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}

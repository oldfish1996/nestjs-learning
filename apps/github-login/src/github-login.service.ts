import { Injectable } from "@nestjs/common";

@Injectable()
export class GithubLoginService {
  private users = [
    {
      githubId: "123456",
      name: "chen",
      email: "chen@example.com",
    },
  ];

  getHello(): string {
    return "Hello World!";
  }

  createUser(user: any) {
    this.users.push(user);
  }

  fundUserByGithubId(githubId: string) {
    return this.users.find((item) => item.githubId === githubId);
  }
}

export class UserVo {
  id: number;
  name: string;
  // password: string; // 密码不返回
  email: string;

  constructor(partial: Partial<UserVo>) {
    Object.assign(this, partial);
  }
}

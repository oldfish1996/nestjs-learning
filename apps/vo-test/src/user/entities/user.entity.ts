import { Exclude, Transform, Expose } from "class-transformer";
export class User {
  id: number;
  name: string;
  @Exclude()
  password: string;

  @Expose()
  get xxx(): string {
    return `${this.name} ${this.email}`;
  }

  @Transform(({ value }) => `email:${value}`)
  email: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

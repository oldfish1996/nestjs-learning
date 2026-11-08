import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from "./user/entities/user.entity";

export interface GoogleInfo {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

@Injectable()
export class GoogleLoginService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  getHello(): string {
    return "Hello World!";
  }

  async registerByGoogle(info: GoogleInfo) {
    const user = new User();

    user.nickName = `${info.firstName}_${info.lastName}`;
    user.avater = info.picture;
    user.email = info.email;
    user.password = "";
    user.registerType = 2;

    return this.entityManager.save(user);
  }

  async findByGoogleEmail(email: string) {
    return this.entityManager.findOne(User, {
      where: { email, registerType: 2 },
    });
  }
}

import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  async findUserByEmail(email: string) {
    return await this.entityManager.findOneBy(User, { email });
  }
}

import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  async login(loginDto: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginDto.username,
      },
    });

    if (!user) {
      throw new BadRequestException("user not found");
    }

    if (user.password !== loginDto.password) {
      throw new BadRequestException("password error");
    }
    return user;
  }
}

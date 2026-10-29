import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  // 这样就不用每次都去获取repository
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    // return this.entityManager.save(User, createUserDto);
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    // return this.entityManager.find(User);
    return this.userRepository.find();
  }

  findOne(id: number) {
    // return this.entityManager.findOne(User, { where: { id } });
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // return this.entityManager.save(User, { id, ...updateUserDto });
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    // return this.entityManager.delete(User, id);
    return this.userRepository.delete(id);
  }
}

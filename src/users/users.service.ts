import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserBody, UpdateUserBody, User } from './users.types';

@Injectable()
export class UsersService {
  private nextId = 3;

  private users: User[] = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 22 },
  ];

  findAll(keyword?: string) {
    if (!keyword) {
      return this.users;
    }

    const normalizedKeyword = keyword.trim().toLowerCase();

    return this.users.filter((user) => user.name.toLowerCase().includes(normalizedKeyword));
  }

  findOne(id: number) {
    this.assertValidId(id);

    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  create(body: CreateUserBody) {
    const user: User = {
      id: this.nextId,
      name: body.name,
      age: body.age,
    };

    this.nextId += 1;
    this.users.push(user);

    return user;
  }

  update(id: number, body: UpdateUserBody) {
    const user = this.findOne(id);

    Object.assign(user, {
      name: body.name ?? user.name,
      age: body.age ?? user.age,
    });

    return user;
  }

  remove(id: number) {
    const user = this.findOne(id);

    this.users = this.users.filter((item) => item.id !== user.id);

    return {
      success: true,
      deletedId: user.id,
    };
  }

  private assertValidId(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('User id must be a positive integer');
    }
  }
}

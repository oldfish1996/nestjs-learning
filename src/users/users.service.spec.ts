import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it('returns all users', () => {
    expect(service.findAll()).toHaveLength(2);
  });

  it('filters users by keyword', () => {
    expect(service.findAll('ali')).toEqual([{ id: 1, name: 'Alice', age: 20 }]);
  });

  it('creates a user', () => {
    expect(service.create({ name: 'Charlie', age: 25 })).toEqual({
      id: 3,
      name: 'Charlie',
      age: 25,
    });
  });

  it('updates a user', () => {
    expect(service.update(1, { age: 21 })).toEqual({ id: 1, name: 'Alice', age: 21 });
  });

  it('removes a user', () => {
    expect(service.remove(1)).toEqual({ success: true, deletedId: 1 });
    expect(() => service.findOne(1)).toThrow(NotFoundException);
  });

  it('rejects invalid ids', () => {
    expect(() => service.findOne(Number.NaN)).toThrow(BadRequestException);
  });
});

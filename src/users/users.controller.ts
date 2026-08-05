import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserBody, UpdateUserBody } from './users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // query访问 通过 /users?keyword=xxx
  @Get()
  findAll(@Query('keyword') keyword?: string) {
    return this.usersService.findAll(keyword);
  }

  // url param 也就是通过 /users/1 访问
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  // DTO data transfer object
  /**
   * curl -X POST http://localhost:3000/users \
   * -H "Content-Type: application/x-www-form-urlencoded" \
   * -d "name=Charlie&age=25"
   */
  @Post()
  create(@Body() body: CreateUserBody) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}

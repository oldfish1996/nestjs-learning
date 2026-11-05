import { PartialType } from '@nestjs/mapped-types';
import { UserLoginDto } from './login.dto';

export class UpdateUserDto extends PartialType(UserLoginDto) {}

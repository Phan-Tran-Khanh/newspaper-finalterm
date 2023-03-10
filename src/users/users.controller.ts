import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  getProfile(@Param('username') username: string) {
    return 'return user profile'
  }

  @Patch(':username')
  updateProfile(@Param('username') username: string) {
    return 'update user profile'
  }
}

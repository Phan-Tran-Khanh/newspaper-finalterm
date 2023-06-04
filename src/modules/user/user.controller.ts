import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/entity/user.entity';

@Roles('Admin')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: User) {
    return this.userService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: User) {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userService.remove(+id);
  }
}

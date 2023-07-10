import { Controller, Post, Body, Put, Param, Delete, Redirect } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/entity/user.entity';

// @Roles('Admin')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Redirect('/')
  create(@Body() dto: User) {
    if (dto.id) {
      return this.userService.update(dto.id, dto);
    }
    return this.userService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: User) {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userService.remove(+id);
  }
}

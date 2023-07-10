import { Controller, Post, Body, Put, Param, Delete, Redirect } from '@nestjs/common';
import { Protected } from 'src/decorator/protected.decorator';
import { CategoryService } from './category.service';
import { Category } from 'src/entity/category.entity';

@Controller('category')
// @Protected('Admin')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Redirect('/admin')
  create(@Body() dto: Category | any) {
    if (dto.isDelete) return this.categoryService.remove(dto.id);
    if (dto?.id !== undefined) return this.categoryService.update(dto.id, dto);
    return this.categoryService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Category) {
    return this.categoryService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Protected } from 'src/decorator/protected.decorator';
import { CategoryService } from './category.service';
import { Category } from 'src/entity/category.entity';

@Controller('category')
@Protected('Admin')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() dto: Category) {
    return this.categoryService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Category) {
    return this.categoryService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

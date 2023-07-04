import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
// import { Protected } from 'src/decorator/protected.decorator';
import { Article } from 'src/entity/article.entity';
import { ArticleService } from './article.service';
import { CategoryService } from '../category/category.service';

@Controller('article')
// @Protected('Writer')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() dto: Article) {
    console.log(dto);
    if (dto?.id !== undefined) return this.articleService.update(dto.id, dto);
    return this.articleService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Article) {
    return this.articleService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}

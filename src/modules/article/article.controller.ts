import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Article } from 'src/entity/article.entity';
import { ArticleService } from './article.service.impl';
import { Comment } from 'src/entity/comment.entity';

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

  @Put(':id/aprrove')
  aprrove(@Param('id') id: string, @Body() dto: Article) {
    return this.articleService.aprrove(+id);
  }

  @Put(':id/reject')
  reject(@Param('id') id: string, @Body() dto: Article) {
    return this.articleService.reject(+id);
  }

  @Put(':id/comment')
  comment(@Param('id') id: string, @Body() dto: Comment) {
    return this.articleService.comment(+id, dto);
  }
}

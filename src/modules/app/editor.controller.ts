import { Controller, Get, Param, Render, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller('editor')
export class EditorController {
  constructor(private readonly appService: AppService) {}
  @Get('approve')
  @Render('editor/approve')
  async editorView(@Req() req: Request) {
    const [categories, labels, articles] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.getArticles(),
    ]);
    return {
      file: 'editor/approve',
      user: req.user,
      categories,
      labels,
      articles,
    };
  }

  @Get('disapprove')
  @Render('editor/disapprove')
  async disapproveView(@Req() req: Request) {
    const [categories, labels, articles] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.getArticles(),
    ]);
    return {
      file: 'editor/disapprove',
      user: req.user,
      categories,
      labels,
      articles,
    };
  }

  @Get('detail/:slug')
  @Render('editor/detail')
  async detailView(@Req() req: Request, @Param('slug') slug: string) {
    const [categories, labels, article] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.getArticleBySlug(slug),
    ]);
    return {
      file: 'editor/detail',
      user: req.user,
      categories,
      labels,
      article,
    };
  }

  @Get('list')
  @Render('editor/list')
  async listView(@Req() req: Request) {
    const [categories, labels, articles, users] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.getArticles(),
      this.appService.getUsers(),
    ]);
    return {
      file: 'editor/list',
      user: req.user,
      categories,
      labels,
      articles,
      users,
    };
  }
}

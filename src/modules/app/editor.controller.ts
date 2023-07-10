import {
  Controller,
  Get,
  Param,
  Render,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { JwtInterceptor } from 'src/interceptors/JwtInterceptors';

@Controller('editor')
@UseInterceptors(JwtInterceptor)
export class EditorController {
  constructor(private readonly appService: AppService) {}
  @Get('approve/:slug')
  @Render('editor/approve')
  async editorView(@Req() req: Request, @Param('slug') slug: string) {
    const [categories, labels, article] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.getArticleBySlug(slug),
    ]);
    return {
      file: 'editor/approve',
      user: req.user,
      categories,
      labels,
      article,
    };
  }

  @Get('disapprove/:slug')
  @Render('editor/disapprove')
  async disapproveView(@Req() req: Request, @Param('slug') slug: string) {
    const [categories, labels, article] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.getArticleBySlug(slug),
    ]);
    return {
      file: 'editor/disapprove',
      user: req.user,
      categories,
      labels,
      article,
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
    const [categories, labels, articles] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.getArticles(),
    ]);
    return {
      file: 'editor/list',
      user: { ...req.user, category: categories[0] },
      categories,
      labels,
      articles,
    };
  }
}

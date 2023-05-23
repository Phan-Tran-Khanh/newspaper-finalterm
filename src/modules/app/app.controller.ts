import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async homeView() {
    const [categories, weeklyArticles, topArticles, allCategories] =
      await Promise.all([
        this.appService.getCategories(),
        this.appService.getWeeklyArticles(),
        this.appService.getTopArticles(),
        this.appService.getTopAllCategories(),
      ]);
    return {
      layout: 'layouts/index',
      categories,
      weeklyArticles,
      topArticles,
      allCategories,
    };
  }

  @Get('/search')
  @Render('search')
  async searchView(@Query() query: any) {
    const [categories, tags, articles] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLables(),
      this.appService.searchArticles(query),
    ]);
    return {
      layout: 'layouts/index',
      categories,
      tags,
      articles,
    };
  }

  @Get('/:slug')
  @Render('detail')
  async articleView(@Param('slug') slug: string) {
    const [categories, article] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getArticleBySlug(slug),
    ]);
    const relatedArticles = await this.appService.getRelatedArticles(article);
    return {
      layout: 'layouts/index',
      categories,
      article,
      relatedArticles,
    };
  }
}

import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async homeView() {
    const [categories, weeklyArticles, topArticles, topArticlesByCategory] =
      await Promise.all([
        this.appService.getCategories(),
        this.appService.getWeeklyArticles(),
        this.appService.getTopArticles(),
        this.appService.getTopArticlesByCategory(),
      ]);
    return {
      layout: 'layouts/index',
      file: 'index',
      categories,
      weeklyArticles,
      topArticles,
      topArticlesByCategory,
    };
  }

  @Get('/search')
  @Render('search')
  async searchView(
    @Query('category') category: string,
    @Query('label') label: string,
    @Query('time') time: 'day' | 'week' | 'month' | 'year',
    @Query('queryString') queryString: string,
  ) {
    const [categories, tags, articles] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.searchArticles({
        category,
        label,
        time,
        queryString,
      }),
    ]);
    return {
      layout: 'layouts/index',
      file: 'search',
      categories,
      tags,
      articles,
    };
  }

  @Get('/:slug')
  @Render('article')
  async articleView(@Param('slug') slug: string) {
    console.log('slug', slug);
    const [categories, article] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getDetailArticleBySlug(slug),
    ]);
    const relatedArticles = await this.appService.getRelatedArticles(article);
    return {
      layout: 'layouts/index',
      file: 'article',
      categories,
      article,
      relatedArticles,
    };
  }
}

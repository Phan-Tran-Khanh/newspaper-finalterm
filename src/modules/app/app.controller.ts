import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Article } from 'src/entity/article.entity';
import { SearchQuery, SearchQueryType } from './SearchQuery';

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
      file: 'index',
      categories,
      weeklyArticles,
      topArticles,
      topArticlesByCategory,
    };
  }

  @Get('/search')
  @Render('search')
  async searchView(@Query() query: SearchQueryType) {
    const searchQuery = new SearchQuery(query);

    const [categories, labels, articles] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.searchArticles(searchQuery),
    ]);

    return {
      file: 'search',
      categories,
      labels,
      articles,
      totalPage: Math.ceil(articles.length / 10),
    };
  }

  @Get('/:slug')
  @Render('article')
  async articleView(@Param('slug') slug: string) {
    const [categories, article] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getDetailArticleBySlug(slug),
    ]);
    const relatedArticles = await this.appService.getRelatedArticles(
      article as Article,
    );
    return {
      file: 'article',
      categories,
      article,
      relatedArticles,
    };
  }
}

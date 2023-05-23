import { Controller, Get, Query, Render } from '@nestjs/common';
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
      test: 'test',
    };
  }

  @Get('/article')
  @Render('article')
  articleView() {
    // TODO
  }

  @Get('/list')
  @Render('list')
  listView() {
    // TODO
  }

  @Get('/search')
  @Render('search')
  searchView(@Query() query: any) {
    const { category, tags, abstract, title, content, time } = query;

    return {
      layout: 'layouts/index',
    };
  }

  // @Get('/:slug')
  // @Render('detail')
  // detailArticleView() {
  //   // TODO
  // }
}

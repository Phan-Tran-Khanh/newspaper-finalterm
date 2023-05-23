import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async homeView() {
    return {
      layout: 'layouts/index',
      categories: await this.appService.getCategories(),
      weeklyArticles: await this.appService.getWeeklyArticles(),
      topArticles: await this.appService.getTopArticles(),
      allCategories: await this.appService.getTopAllCategories(),
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
  searchArticleView() {
    // TODO
  }

  // @Get('/:slug')
  // @Render('detail')
  // detailArticleView() {
  //   // TODO
  // }
}

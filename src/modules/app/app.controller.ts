import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  homeView() {
    this.appService.getHome();
    return {
      layout: 'layouts/index',
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

  @Get('/:slug')
  @Render('detail')
  detailArticleView() {
    // TODO
  }
}

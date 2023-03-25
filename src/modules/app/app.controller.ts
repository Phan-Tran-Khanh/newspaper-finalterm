import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  homeView() {
    console.log(this.appService.getHome());
    return {
      layout: 'layouts/index',
    };
  }

  @Get('/search')
  @Render('search')
  searchArticleView() {}

  @Get('/:slug')
  @Render('detail')
  detailArticleView() {}
}

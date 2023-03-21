import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  homeView() {
    return {
      categories: [],
      
    };
  }

  @Get('/search')
  @Render('search')
  searchPostView() {}

  @Get('/:username/:slug')
  @Render('detail')
  detailPostView() {}
}

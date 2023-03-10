import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  homeView() {
    return this.appService.getHome();
  }

  @Get()
  @Render('latest')
  latestPost() {
  }

  @Get()
  @Render('popular')
  popularPost() {
  }


  @Get('/create-post')
  @Render('create-post')
  createPostView() {
    
  }

  @Get(':username')
  @Render('profile')
  profileView() {
    return this.appService.getProfile();
  }
}

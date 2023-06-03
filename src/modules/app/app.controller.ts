import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Article } from 'src/entity/article.entity';
import { SearchParms, SearchParamsType } from './dto/SearchQuery';
import { JwtInterceptor } from 'src/interceptors/JwtInterceptors';
import { User } from 'src/entity/user.entity';

@Controller()
@UseInterceptors(JwtInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async homeView(@Req() req: Request & { user: User }) {
    const [categories, weeklyArticles, topArticles, topArticlesByCategory] =
      await Promise.all([
        this.appService.getCategories(),
        this.appService.getWeeklyArticles(),
        this.appService.getTopArticles(),
        this.appService.getTopArticlesByCategory(),
      ]);
    return {
      file: 'index',
      user: req.user,
      categories,
      weeklyArticles,
      topArticles,
      topArticlesByCategory,
    };
  }

  @Get('/search')
  @Render('search')
  async searchView(
    @Query() query: SearchParamsType,
    @Req() req: Request & { user: User },
  ) {
    const searchParams = new SearchParms(query);

    const [categories, labels, articlesPage] = await Promise.all([
      this.appService.getCategories(),
      this.appService.getLabels(),
      this.appService.searchArticles(searchParams),
    ]);

    return {
      file: 'search',
      user: req.user,
      categories,
      labels,
      articles: articlesPage.content,
      totalPage: articlesPage.totalPage,
      searchParams,
    };
  }

  @Get('article/:slug')
  @Render('article')
  async articleView(
    @Param('slug') slug: string,
    @Req() req: Request & { user: User },
  ) {
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
      user: req.user,
    };
  }
}

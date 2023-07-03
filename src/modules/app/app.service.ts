import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { LabelService } from '../label/label.service';
import { ArticleService } from '../article/article.service';
import { Article } from 'src/entity/article.entity';
import { SearchParms } from './dto/SearchQuery';
import { Page } from './dto/Page';
import fake from 'src/utils/faker';
import { UserService } from '../user/user.service';

@Injectable()
export class AppService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly labelService: LabelService,
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
  ) {}
  async faker() {
    return fake(
      this.categoryService,
      this.labelService,
      this.userService,
      this.articleService,
    );
  }
  async getUsers() {
    return this.userService.findAll();
  }
  async getArticles() {
    return this.articleService.findAll();
  }
  async getCategories() {
    return this.categoryService.findAll();
  }
  async getLabels() {
    return this.labelService.findAll();
  }
  async getWeeklyArticles() {
    return this.articleService.getWeeklyArticles();
  }
  async getTopArticles() {
    const topCategories = await this.categoryService.getMostViewedCategories();
    const topArticles = [];
    for (const category of topCategories) {
      const articles = await this.articleService.getMostViewedByCategory(
        category.id,
        1,
      );
      topArticles.push(...articles);
    }
    return topArticles;
  }
  async getTopArticlesByCategory() {
    const categories = await this.categoryService.findAll();
    const topArticles = [];
    for (const category of categories) {
      const mostViewed = await this.articleService.getMostViewedByCategory(
        category.id,
      );
      const latest = await this.articleService.getLatestByCategory(category.id);
      topArticles.push({
        category,
        mostViewed,
        latest,
      });
    }
    return topArticles;
  }
  async searchArticles(searchQuery: SearchParms): Promise<Page<Article>> {
    return this.articleService.searchArticles(searchQuery);
  }
  async getDetailArticleBySlug(slug: string) {
    return this.articleService.getDetailArticleBySlug(slug);
  }
  async getRelatedArticles(article: Article) {
    return this.articleService.getMostViewedByCategory(article.category.id);
  }
}

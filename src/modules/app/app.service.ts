import { Injectable, Query } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { LabelService } from '../label/label.service';
import { ArticleService } from '../article/article.service';

@Injectable()
export class AppService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly labelService: LabelService,
    private readonly articleService: ArticleService,
  ) {}
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
    const topArticles: Record<string, any> = {};
    for (const category of categories) {
      const mostViewed = await this.articleService.getMostViewedByCategory(
        category.id,
      );
      const latest = await this.articleService.getLatestByCategory(category.id);
      topArticles[category.name] = {
        mostViewed,
        latest,
      };
    }

    return topArticles;
  }
  async searchArticles(query: {
    category: string;
    label: string;
    time: 'day' | 'week' | 'month' | 'year';
    queryString: string;
  }) {
    return this.articleService.searchArticles(query);
  }
  async getDetailArticleBySlug(slug: string) {
    return this.articleService.getDetailArticleBySlug(slug);
  }
  async getRelatedArticles(article: any) {
    return this.articleService.getMostViewedByCategory(article.category.id);
  }
}

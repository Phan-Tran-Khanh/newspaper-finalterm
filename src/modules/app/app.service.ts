import { Injectable, Query } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { LabelService } from '../label/label.service';
import { ArticleService } from '../article/article.service';
import slugify from 'slugify';
import { Article } from 'src/entity/article.entity';
import { SearchQuery } from './SearchQuery';

@Injectable()
export class AppService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly labelService: LabelService,
    private readonly articleService: ArticleService,
  ) {}
  async getCategories() {
    const categories = await this.categoryService.findAll();
    return categories.map((category) => ({
      ...category,
      slug: slugify(category.name, { lower: true }),
      children: category.children.map((child) => ({
        ...child,
        slug: slugify(child.name, { lower: true }),
      })),
    }));
  }
  async getLabels() {
    const labels = await this.labelService.findAll();
    return labels.map((label) => ({
      ...label,
      slug: slugify(label.name, { lower: true }),
    }));
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
  async searchArticles(searchQuery: SearchQuery) {
    return this.articleService.searchArticles(searchQuery);
  }
  async getDetailArticleBySlug(slug: string) {
    return this.articleService.getDetailArticleBySlug(slug);
  }
  async getRelatedArticles(article: Article) {
    return this.articleService.getMostViewedByCategory(article.category.id);
  }
}

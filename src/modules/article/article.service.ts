import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { ArticleStatus } from 'src/enum/ArticleStatus.enum';
import { Repository } from 'typeorm';
import { SearchQuery } from '../app/dto/SearchQuery';
import { Page } from '../app/dto/Page';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  getLatestByCategory(categoryId: number, take = 10): Promise<Article[]> {
    return this.articleRepository.find({
      where: {
        category: {
          id: categoryId,
        },
        status: ArticleStatus.Published,
      },
      order: {
        publishedAt: 'DESC',
      },
      take,
    });
  }
  getMostViewedByCategory(categoryId: number, take = 10): Promise<Article[]> {
    return this.articleRepository.find({
      where: {
        category: {
          id: categoryId,
        },
        status: ArticleStatus.Published,
      },
      order: {
        viewCount: 'DESC',
      },
      take,
    });
  }
  async getDetailArticleBySlug(slug: string): Promise<Article | null> {
    const article = await this.articleRepository.findOne({
      where: { slug, status: ArticleStatus.Published },
      relations: ['createdBy', 'category', 'labels'],
    });
    if (article) {
      article.viewCount++;
      article.weeklyViewCount++;
      await this.articleRepository.save(article);
    }
    return article;
  }
  async getWeeklyArticles(take = 4): Promise<Article[]> {
    return this.articleRepository.find({
      relations: ['createdBy', 'publishedBy'],
      where: {
        status: ArticleStatus.Published,
      },
      order: {
        weeklyViewCount: 'DESC',
      },
      take,
    });
  }
  async searchArticles(searchQuery: SearchQuery): Promise<Page<Article>> {
    const { page, pageSize } = searchQuery;
    const [articles, total] = await this.articleRepository.findAndCount({
      relations: ['createdBy', 'publishedBy'],
      where: {
        status: ArticleStatus.Published,
      },
      order: {
        publishedAt: 'DESC',
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      content: articles,
      totalPage: Math.ceil(total / pageSize),
      page,
      pageSize,
    };
  }
}

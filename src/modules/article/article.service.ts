import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { ArticleStatus } from 'src/enum/ArticleStatus.enum';
import { Repository } from 'typeorm';

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
      where: {
        status: ArticleStatus.Published,
      },
      order: {
        weeklyViewCount: 'DESC',
      },
      take,
    });
  }
  async searchArticles(query: {
    category: string;
    label: string;
    time: 'day' | 'week' | 'month' | 'year';
    queryString: string;
  }): Promise<Article[]> {
    const { category, label, queryString, time } = query;
    const qb = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.labels', 'label')
      .leftJoinAndSelect('article.createdBy', 'createdBy')
      .where('article.status = :status', { status: ArticleStatus.Published });
    if (category) {
      qb.andWhere('category.slug = :category', { category });
    }
    if (label) {
      qb.andWhere('label.slug = :label', { label });
    }
    if (queryString) {
      qb.andWhere('article.title LIKE :queryString', {
        queryString: `%${queryString}%`,
      });
    }
    if (time) {
      const now = new Date();
      const timeMap = {
        day: now.setDate(now.getDate() - 1),
        week: now.setDate(now.getDate() - 7),
        month: now.setDate(now.getDate() - 30),
        year: now.setDate(now.getDate() - 365),
      };
      qb.andWhere('article.createdAt > :time', {
        time: timeMap[time],
      });
    }
    return qb.getMany();
  }
}

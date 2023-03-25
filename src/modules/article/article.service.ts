import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  createDraft(article: Article): Promise<Article> {
    article.isPublished = false;
    return this.articleRepository.save(article);
  }
  
  removeDraft(article: Article): Promise<Article> {
    return this.articleRepository.remove(article);
  }

  publishDraft(article: Article, userId: number): Promise<Article> {
    article.publishedAt = new Date();
    article.publishedBy = userId;
    return this.articleRepository.save(article);
  }
  unpublishDraft(article: Article): Promise<Article> {
    article.isPublished = false;
    return this.articleRepository.save(article);
  }

  getDraftsByUser(userId: number): Promise<Article[]> {
    return this.articleRepository.find({
      where: {
        isPublished: false,
        author: {
          id: userId,
        },
      },
    });
  }

  getPulishedByUser(userId: number): Promise<Article[]> {
    return this.articleRepository.find({
      where: {
        isPublished: true,
        author: {
          id: userId,
        },
      },
    });
  }

  getPublishedByCategory(categoryId: number): Promise<Article[]> {
    return this.articleRepository.find({
      where: {
        isPublished: true,
        category: {
          id: categoryId,
        },
      },
    });
  }

  getLastestByCategory(categoryId: number): Promise<Article[]> {
    return this.articleRepository.find({
      where: {
        isPublished: true,
        category: {
          id: categoryId,
        },
      },
      order: {
        publishedAt: 'DESC',
      },
      take: 10,
    });
  }

  getMostViewByCategory(categoryId: number): Promise<Article[]> {
    return this.articleRepository.find({
      where: {
        isPublished: true,
        category: {
          id: categoryId,
        },
      },
      order: {
        viewCount: 'DESC',
      },
      take: 10,
    });
  }

  async getDetailBySlug(slug: string): Promise<Article | null> {
    const article = await this.articleRepository.findOne({
      where: {
        slug,
      },
      relations: ['author', 'category'],
    });
    if (article) {
      article.viewCount++;
      await this.articleRepository.save(article);
    }
    return article;
  }
}

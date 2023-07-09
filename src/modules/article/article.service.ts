import { Article } from 'src/entity/article.entity';
import { Page } from '../app/dto/Page';
import { SearchParms } from '../app/dto/SearchQuery';
import { Comment } from 'src/entity/comment.entity';

export interface ArticleServiceInterface {
  findAll(): Promise<Article[]>;
  create(dto: Article): Promise<Article>;
  update(id: number, dto: Article): Promise<Article | null>;
  remove(id: number): void;
  getArticlesByCategoryId(categoryId: number): Promise<Article[]>;
  getLatestByCategory(categoryId: number, take?: number): Promise<Article[]>;
  getMostViewedByCategory(
    categoryId: number,
    take?: number,
  ): Promise<Article[]>;
  searchArticles(searchParms: SearchParms): Promise<Page<Article>>;
  getArticleBySlug(slug: string): Promise<Article | null>;
  aprrove(articleId: number): Promise<Article | null>;
  reject(articleId: number): Promise<Article | null>;
  comment(articleId: number, dto: Comment): Promise<Article | null>;
}

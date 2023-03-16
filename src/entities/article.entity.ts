import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Audit } from './audit.entity';
import { Lable } from './lable.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Category } from './category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  summary: string;

  @Column()
  content: string;

  @Column()
  viewCount: number;

  @Column()
  bannerImageUrl: string;

  @Column()
  pdfUrl: string;

  @Column()
  isPremium: boolean;

  @Column()
  publishedAt: Date;

  @Column()
  publishedBy: number;

  @Column(() => Audit, { prefix: false })
  audit: Audit;

  @ManyToMany(() => Lable)
  @JoinTable({ name: 'article_lables' })
  lables: Lable[];

  @ManyToOne(() => User)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToOne(() => Category, (category) => category.articles)
  @JoinColumn()
  category: Category;
}

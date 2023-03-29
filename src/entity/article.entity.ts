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
import { MaxLength } from 'class-validator';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(255)
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  summary: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column()
  bannerImageUrl: string;

  @Column()
  pdfUrl: string;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ default: false })
  isPublished: boolean;

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

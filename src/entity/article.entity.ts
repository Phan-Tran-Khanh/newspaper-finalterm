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
import { Label } from './label.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Category } from './category.entity';
import { MaxLength } from 'class-validator';
import { ArticleStatus } from 'src/enum/ArticleStatus.enum';

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

  @Column({ default: 0 })
  weeklyViewCount: number;

  @Column()
  bannerImageUrl: string;

  @Column()
  pdfUrl: string;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ enum: ArticleStatus, default: ArticleStatus.Draft })
  status: ArticleStatus;

  @Column({ nullable: true })
  publishedAt: Date;

  @Column({ nullable: true })
  publishedBy: number;

  @Column(() => Audit, { prefix: false })
  audit: Audit;

  @ManyToOne(() => User)
  createdBy: User;

  @ManyToMany(() => Label)
  @JoinTable({ name: 'article_labels' })
  labels: Label[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToOne(() => Category, (category) => category.articles)
  @JoinColumn()
  category: Category;
}

import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { Audit } from './audit';

@Entity()
export class Comment extends Audit {
  @Column({ nullable: true })
  content: string;

  @ManyToOne(() => Comment, (comment) => comment.children)
  parent: number;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article: Article;
}

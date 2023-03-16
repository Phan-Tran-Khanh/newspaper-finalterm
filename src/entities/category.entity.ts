import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Article } from './article.entity';
import { Audit } from './audit.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column(() => Audit)
  audit: Audit;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];
}

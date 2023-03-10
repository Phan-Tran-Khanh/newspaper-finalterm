import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "./audit.entity";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  content: string;

  @Column()
  categoryId: number;

  @Column()
  isPremium: boolean;

  @Column()
  viewCount: number;

  @Column()
  bannerImage: string;

  @Column()
  publishedAt: Date;
  
  @Column()
  publishedBy: number;

  @Column(() => Audit)
  audit: Audit;
}


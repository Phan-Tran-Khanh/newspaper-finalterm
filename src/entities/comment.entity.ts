import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  articleId: number;

  @Column()
  userId: number;

  @Column()
  parentId: number;

  @Column()
  content: string;
}

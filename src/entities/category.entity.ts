import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
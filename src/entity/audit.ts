import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export abstract class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'NOW()', nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdBy' })
  createdBy: number;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: number;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'deletedBy' })
  deletedBy: number;
}

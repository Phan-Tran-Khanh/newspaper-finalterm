import { Column } from 'typeorm';

export class Audit {
  @Column({ default: () => 'NOW()', nullable: true })
  createdAt: Date;
  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedAt: Date;
  @Column({ nullable: true })
  updatedBy: number;

  @Column({ nullable: true })
  deletedAt: Date;
  @Column({ nullable: true })
  deletedBy: number;
}

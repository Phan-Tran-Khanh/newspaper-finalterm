import { Column } from 'typeorm';

export class Audit {
  @Column({ default: () => 'NOW()' })
  createdAt: Date;
  @Column()
  createdBy: number;

  @Column()
  updatedAt: Date;
  @Column()
  updatedBy: number;

  @Column()
  deletedAt: Date;
  @Column()
  deletedBy: number;
}

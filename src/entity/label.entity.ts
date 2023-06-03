import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Column()
  name: string;

  @Column()
  description: string;
}

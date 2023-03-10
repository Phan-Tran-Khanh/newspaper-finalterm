import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subcription {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userId: number;

  @Column()
  expiredAt: Date;
}
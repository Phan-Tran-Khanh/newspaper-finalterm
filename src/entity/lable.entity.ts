import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lable {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  description: string;
}
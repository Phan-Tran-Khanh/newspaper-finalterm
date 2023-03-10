import { Entity } from "typeorm";

@Entity()
export abstract class Audit {
  createdAt: Date;
  createdBy: number;

  updatedAt: Date;
  updatedBy: number;

  deletedAt: Date;
  deletedBy: number;
}
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ROLES, UserRole } from 'src/enum/UserRole.enum';
import { Role } from './role.entity';
import { Gender } from 'src/enum/Gender.enum';
import { Category } from './category.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Unique('unique_email', ['email'])
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false, nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column()
  @Length(1, 32)
  firstName: string;

  @Column()
  @Length(1, 32)
  lastName: string;

  @Column({ nullable: true })
  penName: string;

  @Column({ enum: Gender, nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  subcriptionExpiryDate: Date;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  get roles(): UserRole[] {
    return ROLES.filter((_, index) => index >= this.role.id);
  }
}

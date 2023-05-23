import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsEmail, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ROLES, UserRole } from 'src/enum/UserRole.enum';
import { Role } from './role.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Unique('unique_email', ['email'])
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Unique('unique_username', ['username'])
  @Column()
  @IsString()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Length(1, 32)
  firstName: string;

  @Column()
  @Length(1, 32)
  lastName: string;

  @Column({ nullable: true })
  penName: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  subcriptionExpiryDate: Date;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  get roles(): UserRole[] {
    return ROLES.filter((role, index) => index >= this.role.id);
  }
}

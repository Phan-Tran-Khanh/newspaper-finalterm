import { IsEmail, IsString, Length } from 'class-validator';
import { ROLES, UserRole } from 'src/enum/UserRole.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column()
  password: string;

  @Column()
  @Length(1, 32)
  firstName: string;

  @Column()
  @Length(1, 32)
  lastName: string;

  @Column({ nullable: true })
  subcriptionExpiryDate: Date;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  get roles(): UserRole[] {
    return ROLES.filter((role, index) => index >= this.role.id);
  }
}

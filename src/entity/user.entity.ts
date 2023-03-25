import { ROLES, UserRole } from 'src/enum/UserRole.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  subcriptionExpiryDate: Date;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  get roles(): UserRole[] {
    return ROLES.filter((role, index) => index >= this.role.id);
  }
}

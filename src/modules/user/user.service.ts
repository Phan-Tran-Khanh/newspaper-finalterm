import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { Role } from 'src/entity/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: User): Promise<User> {
    const user = this.userRepository.create(dto);
    const role = await this.roleRepository.findOneBy({ name: 'User' });
    user.role = role as Role;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role'],
    });
  }

  findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  update(id: number, updateDto: any): Promise<User | null> {
    return this.userRepository.save({ id, ...updateDto });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Role } from 'src/entity/role.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: User): Promise<User> {
    if (dto.password)
      dto.password = await this.hashPassword(dto.password);
    const user = this.userRepository.create(dto);
    const role = await this.roleRepository.findOneBy({ name: 'Subscriber' });
    user.role = role as Role;
    const currentDate = new Date();
    user.subcriptionExpiryDate = new Date();
    user.subcriptionExpiryDate.setDate(currentDate.getDate() + 7);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role'],
    });
  }

  findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async update(id: number, dto: any): Promise<User | null> {
    if (dto.password)
      dto.password = await this.hashPassword(dto.password);
    for (const key in dto) {
      if (!dto[key]) {
        delete dto[key];
      }
    }
    return this.userRepository.save({
      id,
      ...dto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getEditorsByCategoryId(categoryId: number): Promise<User[]> {
    return this.userRepository.findBy({
      category: {
        id: categoryId,
      },
      role: {
        name: 'Editor',
      },
    });
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      this.configService.get('auth.bcrypt.saltOrRounds') as number,
    );
  }
}

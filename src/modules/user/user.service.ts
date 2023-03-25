import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    // const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(createUserDto);
  }

  findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  update(id: number, updateDto: any): Promise<User | null> {
    return this.userRepository.save({ id, ...updateDto });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

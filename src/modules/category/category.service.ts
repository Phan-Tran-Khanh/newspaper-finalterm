import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(dto: Category): Promise<Category> {
    return this.categoryRepository.save(dto);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      relations: ['parent', 'children'],
    });
    // return categories;
    return categories.filter((category) => {
      return category.parent === null;
    });
  }

  update(id: number, dto: Category): Promise<Category> {
    dto.id = id;
    return this.categoryRepository.save(dto);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async getMostViewedCategories(take = 10): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      take,
    });
    return categories;
  }
}

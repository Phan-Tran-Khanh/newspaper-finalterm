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

  async update(id: number, dto: Partial<Category>): Promise<Category | null> {
    const entity = await this.categoryRepository.findOneBy({ id });
    if (!entity) return null;
    Object.assign(entity, dto);
    return this.categoryRepository.save(entity);
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

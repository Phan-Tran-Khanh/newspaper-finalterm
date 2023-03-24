import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: Category): Promise<Category> {
    return this.categoryRepository.save(createCategoryDto);
  }

  update(updateCategoryDto: Category): Promise<Category> {
    return this.categoryRepository.save(updateCategoryDto);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find(
      { relations: ['parent', 'children'] },
    );
    return categories.filter((category) => {
      return category.parent === null;
    });
  }
}

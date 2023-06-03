import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      relations: ['parent', 'children'],
    });
    return categories.filter((category) => {
      return category.parent === null;
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.save({
      id,
      ...updateCategoryDto,
    });
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

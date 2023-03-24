import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';

@Injectable()
export class AppService {
  constructor(private readonly categoryService: CategoryService) {}
  getProfile() {
    throw new Error('Method not implemented.');
  }
  async getHome() {
    const categories = await this.categoryService.findAll();
    return {
      categories,
    };
  }
}

import { Category } from '../../models/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../ICategoryRepository';

export class CategoriesRepositoryInMemory implements ICategoryRepository {
  private categories: Category[] = [];
  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const fakeCategory = new Category();

    Object.assign(fakeCategory, {
      name,
      description,
    });

    this.categories.push(fakeCategory);

    return fakeCategory;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;

    return all;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

import { Category } from '../../models/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../I-categories-repository';

export class CategoriesRepositoryStub implements ICategoriesRepository {
  categories: Category[] = [];
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

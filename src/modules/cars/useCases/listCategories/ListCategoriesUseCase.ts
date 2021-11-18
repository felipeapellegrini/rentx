import { inject, injectable } from 'tsyringe';

import { Category } from '../../models/Category';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const all = await this.categoriesRepository.list();

    return all;
  }
}

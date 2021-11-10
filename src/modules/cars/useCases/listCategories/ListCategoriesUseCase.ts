import { inject, injectable } from 'tsyringe';

import { Category } from '../../models/Category';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const all = await this.categoriesRepository.list();

    return all;
  }
}

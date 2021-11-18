import { inject, injectable } from 'tsyringe';

import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/I-categories-repository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const all = await this.categoriesRepository.list();

    return all;
  }
}

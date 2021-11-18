import { injectable, inject } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { Category } from '../../models/Category';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}
  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists.');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

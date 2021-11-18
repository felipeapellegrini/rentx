import { AppError } from '../../../../errors/app-error';
import { CategoriesRepositoryStub } from '../../repositories/in-memory/categories-repository-stub';
import { CreateCategoryUseCase } from './create-category-use-case';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryStub: CategoriesRepositoryStub;
describe('CreateCategory', () => {
  beforeEach(() => {
    categoriesRepositoryStub = new CategoriesRepositoryStub();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryStub);
  });
  it('Should return a new category on success', async () => {
    const category = {
      name: 'valid_name',
      description: 'valid_description',
    };

    const createdCategory = await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    expect(createdCategory).toHaveProperty('id');
    expect(createdCategory.name).toBe(category.name);
    expect(createdCategory.description).toBe(category.description);
  });

  it('Should not be able to create two categories with same name', async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: 'valid_name',
        description: 'valid_description',
      });
      await createCategoryUseCase.execute({
        name: 'valid_name',
        description: 'valid_description',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

import { AppError } from '../../../../errors/app-error';
import { SpecificationsRepositoryStub } from '../../repositories/in-memory/specifications-repository-stub';
import { CreateSpecificationUseCase } from './create-specification-use-case';

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryStub: SpecificationsRepositoryStub;

describe('CreateSpecification', () => {
  beforeEach(() => {
    specificationsRepositoryStub = new SpecificationsRepositoryStub();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryStub,
    );
  });
  it('Should return a specification on success', async () => {
    const specification = {
      name: 'valid_name',
      description: 'valid_description',
    };

    const createdSpecification = await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    expect(createdSpecification).toHaveProperty('id');
    expect(createdSpecification.name).toBe(specification.name);
    expect(createdSpecification.description).toBe(specification.description);
  });

  it('Should not be able to create two specifications with same name', async () => {
    const specification = {
      name: 'valid_name',
      description: 'valid_description',
    };

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    expect(async () => {
      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

import { injectable, inject } from 'tsyringe';

import { Specification } from '../../models/Specification';
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepository,
  ) {}
  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    const specification = this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };

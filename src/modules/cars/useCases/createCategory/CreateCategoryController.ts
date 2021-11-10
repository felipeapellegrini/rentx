import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createCagoryUseCase = container.resolve(CreateCategoryUseCase);

      const category = await createCagoryUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(category);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
}

export { CreateCategoryController };

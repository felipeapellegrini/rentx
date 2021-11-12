import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, password, email, driver_license } = request.body;
      const createUserUsecase = container.resolve(CreateUserUseCase);

      const user = await createUserUsecase.execute({
        name,
        password,
        email,
        driver_license,
      });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}
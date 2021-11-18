import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/users-repository';
import { AppError } from '../../../errors/app-error';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '15b1c269e2207484d60e5f460eb76119',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const userExists = usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User does not exist', 401);
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}

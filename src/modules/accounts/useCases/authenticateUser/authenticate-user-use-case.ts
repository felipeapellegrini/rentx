import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { AppError } from '../../../../shared/errors/app-error';
import { IUsersRepository } from '../../repositories/I-users-repository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = sign({}, '15b1c269e2207484d60e5f460eb76119', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

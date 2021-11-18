import { AppError } from '../../../../shared/errors/app-error';
import { ICreateUserDTO } from '../../dtos/I-create-user-dto';
import { UsersRepositoryStub } from '../../repositories/in-memory/users-repository-stub';
import { CreateUserUseCase } from '../createUser/create-user-use-case';
import { AuthenticateUserUseCase } from './authenticate-user-use-case';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryStub: UsersRepositoryStub;
let createUserUseCase: CreateUserUseCase;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    usersRepositoryStub = new UsersRepositoryStub();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryStub);
    createUserUseCase = new CreateUserUseCase(usersRepositoryStub);
  });
  it('Should return a token on success', async () => {
    const user: ICreateUserDTO = {
      driver_license: 'valid_driver_license',
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });
  it('should not be able to authenticate an non existing user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'non_existing_mail',
        password: 'any_password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to authenticate an user with wrong password', async () => {
    const user: ICreateUserDTO = {
      driver_license: 'valid_driver_license',
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password',
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid_password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

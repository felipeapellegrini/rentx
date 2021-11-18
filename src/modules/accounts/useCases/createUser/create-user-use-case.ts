import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/app-error';
import { ICreateUserDTO } from '../../dtos/I-create-user-dto';
import { User } from '../../models/User';
import { IUsersRepository } from '../../repositories/I-users-repository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const duplicateLicense = await this.usersRepository.findByLicense(
      driver_license,
    );

    if (duplicateLicense) {
      throw new AppError('This driver license is already registered', 401);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });

    return user;
  }
}

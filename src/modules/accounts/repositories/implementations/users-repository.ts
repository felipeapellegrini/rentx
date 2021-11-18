import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/I-create-user-dto';
import { User } from '../../infra/typeorm/entitities/User';
import { IUsersRepository } from '../I-users-repository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne(user_id);

    return user;
  }
  async findByLicense(driver_license: string): Promise<User> {
    const user = await this.repository.findOne({ driver_license });

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);

    return user;
  }
}

import { ICreateUserDTO } from '../../dtos/I-create-user-dto';
import { User } from '../../models/User';
import { IUsersRepository } from '../I-users-repository';

export class UsersRepositoryStub implements IUsersRepository {
  users: User[] = [];
  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
  async findByLicense(driver_license: string): Promise<User> {
    return this.users.find(user => user.driver_license === driver_license);
  }
  async findById(user_id: string): Promise<User> {
    return this.users.find(user => user.id === user_id);
  }
}

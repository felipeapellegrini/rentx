import { ICreateUserDTO } from '../dtos/I-create-user-dto';
import { User } from '../models/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByLicense(driver_license: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}

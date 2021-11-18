import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/accounts/repositories/I-users-repository';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/users-repository';
import { ICategoriesRepository } from '../../modules/cars/repositories/I-categories-repository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/I-specification-repository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/categories-repository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/specifications-repository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

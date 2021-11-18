import { Router } from 'express';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/create-category-controller';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/list-categories-controller';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', listCategoriesController.handle);

export { categoriesRouter };

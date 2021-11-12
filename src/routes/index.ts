import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { specificationRouter } from './specification.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationRouter);
router.use('/user', usersRouter);

export { router };

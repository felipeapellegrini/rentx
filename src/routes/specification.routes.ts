import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/create-specification-controller';

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.use(ensureAuthenticated);
specificationRouter.post('/', createSpecificationController.handle);

export { specificationRouter };

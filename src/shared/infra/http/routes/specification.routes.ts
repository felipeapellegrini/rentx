import { Router } from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/create-specification-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.use(ensureAuthenticated);
specificationRouter.post('/', createSpecificationController.handle);

export { specificationRouter };

import { Router } from 'express';
import OrphanagesController from '@controllers/OrphanagesController'

const orphanageRouter = Router();

// orphanageRouter.get('/', OrphanagesController.get);
orphanageRouter.post('/', OrphanagesController.create);

export default orphanageRouter;

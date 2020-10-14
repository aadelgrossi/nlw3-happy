import { Router } from 'express';
import OrphanagesController from '@controllers/OrphanagesController'

const orphanageRouter = Router();

orphanageRouter.get('/', OrphanagesController.index);
orphanageRouter.get('/:id', OrphanagesController.show);
orphanageRouter.post('/', OrphanagesController.create);

export default orphanageRouter;

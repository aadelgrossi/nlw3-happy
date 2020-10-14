import { Router } from 'express';
import orphanageRouter from './orphanage.routes';

const routes = Router();

routes.use('/orphanages', orphanageRouter);

export default routes;

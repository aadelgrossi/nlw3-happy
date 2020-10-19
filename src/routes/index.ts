import { Router } from 'express';
import orphanageRouter from './orphanage.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/orphanages', orphanageRouter);
routes.use('/users', usersRouter)

export default routes;

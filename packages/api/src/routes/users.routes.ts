import { Router } from 'express'

import UsersController from '~/controllers/UsersController'
import ensureAuthenticated from '~/middlewares/ensureAuthenticated'

const usersRouter = Router()

usersRouter.post('/', UsersController.create)
usersRouter.get('/', UsersController.index)
usersRouter.get('/me', ensureAuthenticated, UsersController.show)

export default usersRouter

import { Router } from 'express'

// import ensureAuthenticated from '@middlewares/ensureAuthenticated'

import orphanageRouter from './orphanage.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
// routes.use('/orphanages', ensureAuthenticated, orphanageRouter)
routes.use('/orphanages', orphanageRouter)

export default routes

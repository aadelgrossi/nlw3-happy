import { Router } from 'express'

import orphanageRouter from './orphanage.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import passwordRouter from './password.routes'

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/password', passwordRouter)
routes.use('/orphanages', orphanageRouter)

export default routes

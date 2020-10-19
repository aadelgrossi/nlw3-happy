import { Router } from 'express'
import orphanageRouter from './orphanage.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/orphanages', orphanageRouter)

export default routes

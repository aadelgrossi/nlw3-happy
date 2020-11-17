import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '~/config/upload'
import ApprovalController from '~/controllers/ApprovalController'
import OrphanagesController from '~/controllers/OrphanagesController'
import ensureAuthenticated from '~/middlewares/ensureAuthenticated'

const orphanageRouter = Router()
const upload = multer(uploadConfig.multer)

orphanageRouter.get('/pending', ensureAuthenticated, ApprovalController.pending)

orphanageRouter.get('/', OrphanagesController.index)
orphanageRouter.get('/valid', OrphanagesController.valid)
orphanageRouter.get('/:slug', OrphanagesController.show)
orphanageRouter.put('/:slug', ensureAuthenticated, OrphanagesController.update)
orphanageRouter.delete('/:id', OrphanagesController.delete)
orphanageRouter.post('/', upload.array('images'), OrphanagesController.create)

export default orphanageRouter

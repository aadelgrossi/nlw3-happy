import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '~/config/upload'
import OrphanagesController from '~/controllers/OrphanagesController'
import ApprovalController from '~/controllers/ApprovalController'

import ensureAuthenticated from '~/middlewares/ensureAuthenticated'

const orphanageRouter = Router()
const upload = multer(uploadConfig.multer)

orphanageRouter.get('/pending', ensureAuthenticated, ApprovalController.pending)
orphanageRouter.put(
  '/:id/approve',
  ensureAuthenticated,
  ApprovalController.approve
)

orphanageRouter.get('/', OrphanagesController.index)
orphanageRouter.get('/:slug', OrphanagesController.show)
orphanageRouter.put('/:id', OrphanagesController.update)
orphanageRouter.delete('/:id', OrphanagesController.delete)
orphanageRouter.post('/', upload.array('images'), OrphanagesController.create)

export default orphanageRouter

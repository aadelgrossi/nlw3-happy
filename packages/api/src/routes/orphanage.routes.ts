import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '~/config/upload'
import ApprovalController from '~/controllers/ApprovalController'
import OrphanagesController from '~/controllers/OrphanagesController'
import ensureAuthenticated from '~/middlewares/ensureAuthenticated'

const orphanageRouter = Router()
const upload = multer(uploadConfig.multer)

orphanageRouter.get('/pending', ApprovalController.pending)
orphanageRouter.put(
  '/:slug/reject',
  ensureAuthenticated,
  ApprovalController.reject
)

orphanageRouter.get('/', OrphanagesController.index)
orphanageRouter.get('/valid', OrphanagesController.valid)
orphanageRouter.get('/:slug', OrphanagesController.show)
orphanageRouter.get(
  '/edit/:slug',
  ensureAuthenticated,
  OrphanagesController.edit
)
orphanageRouter.put('/:slug', ensureAuthenticated, OrphanagesController.update)
orphanageRouter.delete('/:id', OrphanagesController.delete)
orphanageRouter.post('/', upload.array('files'), OrphanagesController.create)

export default orphanageRouter

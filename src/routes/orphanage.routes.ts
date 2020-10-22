import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '~/config/upload'
import OrphanagesController from '~/controllers/OrphanagesController'

const orphanageRouter = Router()
const upload = multer(uploadConfig.multer)

orphanageRouter.get('/', OrphanagesController.index)
orphanageRouter.get('/:id', OrphanagesController.show)
orphanageRouter.post('/', upload.array('images'), OrphanagesController.create)

export default orphanageRouter

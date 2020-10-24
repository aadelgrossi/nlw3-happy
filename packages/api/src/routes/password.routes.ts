import { Router } from 'express'
import ResetPasswordController from '~/controllers/ResetPasswordController'

const forgotPasswordRouter = Router()

forgotPasswordRouter.post('/forgot', ResetPasswordController.create)
forgotPasswordRouter.put('/reset', ResetPasswordController.reset)

export default forgotPasswordRouter

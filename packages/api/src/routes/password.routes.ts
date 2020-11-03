import { Router } from 'express'

import ResetPasswordController from '~/controllers/ResetPasswordController'

const forgotPasswordRouter = Router()

forgotPasswordRouter.post('/forgot', ResetPasswordController.forgot)
forgotPasswordRouter.post('/reset', ResetPasswordController.reset)

export default forgotPasswordRouter

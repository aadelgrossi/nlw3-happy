import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ResetPasswordService from '~/services/ResetPasswordService'
import SendForgotPasswordEmailService from '~/services/SendForgotPasswordMailService'

export default {
  async forgot(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    )

    await sendForgotPasswordEmail.execute({ email })

    return response.sendStatus(204)
  },

  async reset(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const resetPasswordEmail = container.resolve(ResetPasswordService)

    await resetPasswordEmail.execute({ password, token })

    return response.sendStatus(204)
  }
}

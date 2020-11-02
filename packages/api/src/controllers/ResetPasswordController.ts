import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { getRepository } from 'typeorm'

import User from '~/models/User'
import UserToken from '~/models/UserToken'
import SendForgotPasswordEmailService from '~/services/MailService'
import users_view from '~/views/users_view'

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    )

    await sendForgotPasswordEmail.execute({ email })

    return response.sendStatus(204)
  },

  async reset(request: Request, response: Response): Promise<Response> {
    const { password } = request.body
    const { token } = request.query

    if (!password || !token) {
      return response.sendStatus(400)
    }

    const usersRepository = getRepository(User)
    const userTokensRepository = getRepository(UserToken)

    const userToken = await userTokensRepository.findOne({ where: { token } })

    if (!userToken || userToken.expired) {
      return response.status(422).json({ error: 'Invalid token' })
    }

    const user = await usersRepository.findOne(userToken.user_id)

    if (!user) {
      return response.sendStatus(400)
    }

    user.password = password
    userToken.expired = true

    usersRepository.save(user)
    userTokensRepository.save(userToken)

    return response.json(users_view.render(user))
  }
}

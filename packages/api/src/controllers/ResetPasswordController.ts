import User from '~/models/User'
import UserToken from '~/models/UserToken'
import users_view from '~/views/users_view'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { v4 } from 'uuid'

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const usersRepository = getRepository(User)
    const userTokensRepository = getRepository(UserToken)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      return response.sendStatus(422)
    }

    const userToken = userTokensRepository.create({
      token: v4(),
      user_id: user.id
    })

    userTokensRepository.save(userToken)

    return response.status(201).json(userToken)
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

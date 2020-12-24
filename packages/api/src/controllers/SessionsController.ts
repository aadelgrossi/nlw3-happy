import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import authConfig from '~/config/auth'
import User from '~/models/User'
import userView from '~/views/users_view'

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = getRepository(User)
    const { email, password, remember } = request.body

    const findUser = await usersRepository.findOne({ where: { email } })

    if (!findUser) {
      return response.sendStatus(401)
    }

    const isValidPassword = await compare(password, findUser.password)

    if (!isValidPassword) {
      return response.sendStatus(401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = jwt.sign({ id: findUser.id }, secret, {
      expiresIn: remember ? expiresIn.long : expiresIn.quick
    })

    response.cookie('auth', token)

    const user = userView.render(findUser)
    return response.json({ user, token })
  }
}

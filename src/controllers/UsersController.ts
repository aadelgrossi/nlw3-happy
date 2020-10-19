import User from '@models/User'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import userView from '@views/users_view'

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const usersRepository = getRepository(User)

    const checkUserExists = await usersRepository.findOne({ where: { email } })

    if (checkUserExists) {
      return response.sendStatus(409)
    }

    const user = usersRepository.create({
      name,
      email,
      password
    })

    await usersRepository.save(user)

    return response.status(201).json(userView.render(user))
  },

  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = getRepository(User)

    const users = await usersRepository.find()

    return response.json(userView.renderMany(users))
  }
}

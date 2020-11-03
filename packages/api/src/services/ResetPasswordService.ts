import path from 'path'

import { injectable, inject } from 'tsyringe'
import { getRepository } from 'typeorm'

import AppError from '~/errors/AppError'
import User from '~/models/User'
import UserToken from '~/models/UserToken'
import IMailProvider from '~/providers/MailProvider/models/IMailProvider'

interface IRequest {
  password: string
  token: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const usersRepository = getRepository(User)
    const userTokensRepository = getRepository(UserToken)

    const userToken = await userTokensRepository.findOne({ where: { token } })

    if (!userToken || userToken.expired) {
      throw new AppError('Invalid token', 422)
    }

    const user = await usersRepository.findOne(userToken.user_id)

    if (!user) {
      throw new AppError('Invalid User', 404)
    }

    const resetPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'templates',
      'reset_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Happy] Sua senha foi alterada',
      templateData: {
        file: resetPasswordTemplate,
        variables: {
          name: user.name
        }
      }
    })

    user.password = password
    userToken.expired = true

    usersRepository.save(user)
    userTokensRepository.save(userToken)
  }
}

export default ResetPasswordService

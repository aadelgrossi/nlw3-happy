import path from 'path'

import { injectable, inject } from 'tsyringe'
import { getRepository } from 'typeorm'
import { v4 } from 'uuid'

import AppError from '~/errors/AppError'
import User from '~/models/User'
import UserToken from '~/models/UserToken'
import IMailProvider from '~/providers/MailProvider/models/IMailProvider'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getRepository(User)
    const userTokensRepository = getRepository(UserToken)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('Unknown email.', 422)
    }

    const userToken = userTokensRepository.create({
      token: v4(),
      user_id: user.id
    })

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'templates',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Happy] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.WEB_URL}/reset-password?token=${userToken.token}`
        }
      }
    })

    await userTokensRepository.save(userToken)
  }
}

export default SendForgotPasswordEmailService

import mailTemplate, { MailTemplateDTO } from './mail_template'
import client from '~/config/mail'

interface MailContact {
  name: string
  email: string
}

interface SendMailDTO {
  to: MailContact
  from?: MailContact
  subject: string
  templateData: MailTemplateDTO
}

export default {
  async sendMail({
    from,
    to,
    subject,
    templateData
  }: SendMailDTO): Promise<void> {
    await client.sendMail({
      from: {
        name: from?.name || 'Equipe Happy',
        address: from?.email || 'equipe@happy.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: mailTemplate.parse(templateData)
    })
  }
}

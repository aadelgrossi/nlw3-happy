import SendMailDTO from '../dtos/SendMailDTO'

export default interface IMailProvider {
  sendMail(data: SendMailDTO): Promise<void>
}

import { container } from 'tsyringe'

import HandlebarsMailTemplateProvider from './implementations/HandlebarMailTemplateProvider'
import IMailTemplateProvider from './models/IMailTemplateProvider'

const providers = {
  handlebars: HandlebarsMailTemplateProvider
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
)

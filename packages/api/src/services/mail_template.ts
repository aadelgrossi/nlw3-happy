import fs from 'fs'
import handlebars from 'handlebars'

interface TemplateVariables {
  [key: string]: string
}

export interface MailTemplateDTO {
  file: string
  variables: TemplateVariables
}

export default {
  async parse({ file, variables }: MailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })
    const parsedTemplate = handlebars.compile(templateFileContent)

    return parsedTemplate(variables)
  }
}

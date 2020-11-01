import handlebars from 'handlebars'

interface TemplateVariables {
  [key: string]: string
}

export interface MailTemplateDTO {
  template: string
  variables: TemplateVariables
}

export default {
  parse({ template, variables }: MailTemplateDTO): string {
    const parsedTemplate = handlebars.compile(template)

    return parsedTemplate(variables)
  }
}

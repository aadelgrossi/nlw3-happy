interface MailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      name: string
      email: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: process.env.MAIL_DEFAULT_FROM_NAME || 'Andre Grossi',
      email: process.env.MAIL_DEFAULT_FROM_ADDRESS || 'info@andregrossi.com'
    }
  }
} as MailConfig

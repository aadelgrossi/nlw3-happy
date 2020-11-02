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
      name: 'Andre Grossi',
      email: 'info@andregrossi.com'
    }
  }
} as MailConfig

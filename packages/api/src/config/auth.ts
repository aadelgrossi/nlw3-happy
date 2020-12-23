export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: {
      quick: '30m',
      long: '30d'
    }
  }
}

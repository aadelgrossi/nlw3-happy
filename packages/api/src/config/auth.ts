export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: {
      quick: process.env.QUICK_SESSION || '10m',
      long: process.env.LONG_SESSION || '30d'
    }
  }
}

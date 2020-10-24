import User from '~/models/User'

interface UserOutput {
  id: string
  name: string
  email: string
}

export default {
  render(user: User): UserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  },

  renderMany(users: User[]): UserOutput[] {
    return users.map(user => this.render(user))
  }
}

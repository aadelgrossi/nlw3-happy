import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

import User from '../../models/User'
import { user } from './data'

export default class CreateUsers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const { manager } = connection

    const createdUser = manager.create(User, user)
    await manager.save(createdUser)
  }
}

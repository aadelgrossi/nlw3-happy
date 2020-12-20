import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

import Orphanage from '../../models/Orphanage'
import { orphanages } from './data'

export default class CreateOrphanages implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const { manager } = connection

    await Promise.all(
      orphanages.map(async orphanage => {
        const newOrphanage = manager.create(Orphanage, orphanage)
        await manager.save(newOrphanage)
      })
    )
  }
}

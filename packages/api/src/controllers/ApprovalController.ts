import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Orphanage from '~/models/Orphanage'
import orphanagesView from '~/views/orphanages_views'

export default {
  async pending(_: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      where: [{ approved: null }, { approved: false }],
      relations: ['images']
    })

    return response.json(orphanagesView.renderMany(orphanages))
  }
}

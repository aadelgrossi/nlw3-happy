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
  },

  async reject(request: Request, response: Response): Promise<Response> {
    const { slug } = request.params
    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOne({ where: { slug } })

    orphanage.approved = false

    await orphanagesRepository.save(orphanage)

    return response.sendStatus(200)
  }
}

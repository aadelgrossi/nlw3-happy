import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Orphanage from '~/models/Orphanage'
import orphanagesView from '~/views/orphanages_views'

export default {
  async approve(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { approved } = request.body

    const orphanagesRepository = getRepository(Orphanage)
    const orphanage = await orphanagesRepository.findOne(id)
    if (!orphanage) {
      return response.sendStatus(400)
    }

    orphanage.approved = !!approved
    orphanagesRepository.save(orphanage)

    return response.sendStatus(200)
  },

  async pending(_: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      where: { approved: null },
      relations: ['images']
    })

    return response.json(orphanagesView.renderMany(orphanages))
  }
}

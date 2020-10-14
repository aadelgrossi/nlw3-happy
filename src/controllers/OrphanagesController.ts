import { getRepository } from 'typeorm'
import Orphanage from '@models/Orphanage'

import { Request, Response } from 'express'

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find()

    return response.json(orphanages)
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.findOneOrFail(id)

    return response.json(orphanages)
  },

  async create(request: Request, response: Response) {
    try {
      const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends } = request.body

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = orphanagesRepository.create({
          name,
          latitude,
          longitude,
          about,
          instructions,
          opening_hours,
          open_on_weekends
        })

        await orphanagesRepository.save(orphanage)

        return response.json(orphanage)

    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

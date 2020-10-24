import { getRepository } from 'typeorm'
import Orphanage from '~/models/Orphanage'
import orphanageView from '~/views/orphanages_views'
import * as Yup from 'yup'

import { Request, Response } from 'express'

export default {
  async index(_: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      where: { approved: true },
      relations: ['images']
    })

    return response.json(orphanageView.renderMany(orphanages))
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return response.json(orphanageView.render(orphanages))
  },

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp
    } = request.body

    const orphanagesRepository = getRepository(Orphanage)
    const requestImages = request.files as Express.Multer.File[]

    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      whatsapp: Yup.string().min(10).max(11).required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage)

    return response.json(orphanageView.render(orphanage))
  },

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOne(id, {
      relations: ['images']
    })

    if (!orphanage) {
      return response.sendStatus(422)
    }

    const {
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp
    } = request.body

    if (name !== orphanage.name) {
      const nameIsTaken = await orphanagesRepository.findOne({
        where: { name }
      })

      if (nameIsTaken) {
        return response.sendStatus(409)
      }
    }

    const newOrphanageData = {
      name: name || orphanage.name,
      about: about || orphanage.about,
      instructions: instructions || orphanage.instructions,
      opening_hours: opening_hours || orphanage.opening_hours,
      open_on_weekends:
        open_on_weekends === undefined
          ? orphanage.open_on_weekends
          : open_on_weekends,
      whatsapp: whatsapp || orphanage.whatsapp
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      whatsapp: Yup.string().min(10).max(11).required()
    })

    await schema.validate(newOrphanageData, {
      abortEarly: false
    })

    Object.assign(orphanage, newOrphanageData)

    await orphanagesRepository.save(orphanage)

    return response.json(orphanageView.render(orphanage))
  }
}

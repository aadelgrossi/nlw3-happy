import { Request, Response } from 'express'
import slugify from 'slugify'
import { container } from 'tsyringe'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Orphanage from '~/models/Orphanage'
import FileUploadService from '~/services/FileUploadService'
import orphanageView from '~/views/orphanages_views'

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
    const { slug } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.findOneOrFail({
      where: { slug },
      relations: ['images']
    })

    return response.json(orphanageView.render(orphanages))
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)
    orphanagesRepository.delete(id)

    return response.sendStatus(200)
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

    const sanitizedWhatsapp = whatsapp.replace(/[^\w]/gi, '')

    const orphanagesRepository = getRepository(Orphanage)
    const requestImages = request.files as Express.Multer.File[]

    const uploadImages = container.resolve(FileUploadService)

    const mapImages = requestImages.map(async img => {
      const path = await uploadImages.execute({
        filename: img.filename
      })
      return { path }
    })

    const images = await Promise.all(mapImages)

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      whatsapp: sanitizedWhatsapp,
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
    const { slug } = request.params
    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOne({
      where: { slug },
      relations: ['images']
    })

    if (!orphanage) {
      return response.sendStatus(422)
    }

    const {
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
      approved
    } = request.body

    const sanitizedWhatsapp = whatsapp.replace(/[^\w]/gi, '')

    if (name !== orphanage.name) {
      console.log(name, orphanage.name, 'changing name')
      const nameIsTaken = await orphanagesRepository.findOne({
        where: { name }
      })

      if (nameIsTaken) {
        return response.sendStatus(409)
      }
    }

    const newOrphanageData = {
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      whatsapp: sanitizedWhatsapp || orphanage.whatsapp,
      approved: approved || orphanage.approved
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      about: Yup.string().required().max(300),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      whatsapp: Yup.string().min(10).max(11).required(),
      approved: Yup.boolean().required()
    })

    await schema.validate(newOrphanageData, {
      abortEarly: false
    })

    Object.assign(orphanage, newOrphanageData)

    await orphanagesRepository.save(orphanage)

    return response.json(orphanageView.render(orphanage))
  },

  async valid(request: Request, response: Response): Promise<Response> {
    const { name } = request.query

    const nameSlugged = slugify(name.toString(), { lower: true })

    const orphanagesRepository = getRepository(Orphanage)

    const findOrphanage = await orphanagesRepository.findOne({
      where: { slug: nameSlugged }
    })

    if (findOrphanage) {
      return response.sendStatus(409)
    }

    return response.sendStatus(200)
  }
}

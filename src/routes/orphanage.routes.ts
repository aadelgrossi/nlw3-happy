import { Router } from 'express';
import { getRepository } from 'typeorm'
import Orphanage from '@models/Orphanage'

const orphanageRouter = Router();

// orphanageRouter.get('/', (request, response) => {
//   try {
//     // TODO
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

orphanageRouter.post('/', async (request, response) => {
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
});

export default orphanageRouter;

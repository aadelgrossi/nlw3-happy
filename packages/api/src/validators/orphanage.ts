import * as Yup from 'yup'

const baseSchema = {
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
}

export const validateCreateOrphanage = async (
  data: Record<string, unknown>
): Promise<void> => {
  const schema = Yup.object().shape({
    ...baseSchema,
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required()
      })
    )
  })

  await schema.validate(data, {
    abortEarly: false
  })
}

export const validateUpdateOrphanage = async (
  data: Record<string, unknown>
): Promise<void> => {
  const schema = Yup.object().shape({
    ...baseSchema
  })

  await schema.validate(data, {
    abortEarly: false
  })
}

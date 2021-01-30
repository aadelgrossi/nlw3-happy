import * as Yup from 'yup'

import api from '~/services/api'

export default Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório')
    .test(
      'checkDuplOrphanage',
      'Orfanato já cadastrado. Digite outro nome.',
      async value => {
        try {
          await api.get(`/orphanages/valid?name=${value}`)
          return true
        } catch (err) {
          return false
        }
      }
    ),
  about: Yup.string().required('Campo obrigatório'),
  whatsapp: Yup.string()
    .matches(/^\d+$/, 'Deve ser um número válido')
    .required('Campo obrigatório')
    .min(10, 'Deve conter no mínimo 10 dígitos'),
  images: Yup.array().of(Yup.string())
})

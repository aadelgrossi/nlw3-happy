import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  about: Yup.string().required('Campo obrigatório'),
  whatsapp: Yup.string()
    .matches(/^\d+$/, 'Deve ser um número válido')
    .required('Campo obrigatório')
    .min(10, 'Deve conter no mínimo 10 dígitos'),
  images: Yup.array().of(Yup.string())
})

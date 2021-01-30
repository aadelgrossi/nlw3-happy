import * as Yup from 'yup'

export default Yup.object().shape({
  instructions: Yup.string().required('Campo obrigatório'),
  opening_hours: Yup.string().required('Campo obrigatório'),
  open_on_weekends: Yup.boolean().required('Campo obrigatório')
})

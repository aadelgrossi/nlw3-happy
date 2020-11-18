import React, { useCallback, useRef, useState } from 'react'

import CreateOrphanageSuccessPrompt from '@/components/CreateOrphanageSucessPrompt'
import OrphanageForm from '@/components/OrphanageForm'
import Sidebar from '@/components/Sidebar'
import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import getValidationErrors from '@/utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import Head from 'next/head'
import * as Yup from 'yup'

import { Container, ConfirmButton } from './styles'

interface OrphanageFormData {
  name: string
  about: string
  latitude: number
  longitude: number
  instructions: string
  whatsapp: string
  opening_hours: string
  open_on_weekends: boolean
  image: File[]
}

const CreateOrphanage: React.FC = () => {
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = useCallback(async (data: OrphanageFormData) => {
    formRef.current?.setErrors({})

    const schema = Yup.object().shape({
      name: Yup.string().required('Campo obrigatório'),
      about: Yup.string().required('Campo obrigatório'),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      whatsapp: Yup.string()
        .matches(
          /\(([0-9]){2}\) ([0-9]){5}-([0-9]){4}/,
          'Digite um número valido (xx) xxxxx-xxxx'
        )
        .required('Campo obrigatório'),
      instructions: Yup.string().required('Campo obrigatório'),
      opening_hours: Yup.string().required('Campo obrigatório'),
      open_on_weekends: Yup.boolean().required()
    })

    try {
      await schema.validate(data, { abortEarly: false })
      await api.post('/orphanages', data)
      setSubmitted(true)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }

      addToast({
        title: 'Ocorreu um erro',
        type: 'error',
        description: 'A validação falhou. Favor revise os dados'
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Happy | Cadastrar orfanato</title>
      </Head>

      {submitted ? (
        <CreateOrphanageSuccessPrompt />
      ) : (
        <Container>
          <Sidebar />

          <main>
            <OrphanageForm formRef={formRef} onSubmit={handleSubmit}>
              <ConfirmButton type="submit">Confirmar</ConfirmButton>
            </OrphanageForm>
          </main>
        </Container>
      )}
    </>
  )
}

export default CreateOrphanage

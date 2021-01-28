import React, { useCallback, useRef, useState } from 'react'

import CreateOrphanageSuccessPrompt from '@/components/CreateOrphanageSucessPrompt'
import OrphanageForm from '@/components/OrphanageForm'
import Sidebar from '@/components/Sidebar'
import SubmitButton from '@/components/SubmitButton'
import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import getValidationErrors from '@/utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import Head from 'next/head'
import * as Yup from 'yup'

import { Container } from './styles'

interface OrphanageFormData {
  name: string
  about: string
  latitude: number
  longitude: number
  instructions: string
  whatsapp: string
  opening_hours: string
  open_on_weekends: boolean
  files: {
    [key: string]: FileList
  }
}

const CreateOrphanage: React.FC = () => {
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const performValidation = useCallback(async () => {
    try {
      setIsFormValid(true)
      formRef.current?.setErrors({})
      const data = formRef.current.getData()

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        about: Yup.string().required('Campo obrigatório'),
        whatsapp: Yup.string()
          .matches(
            /\(([0-9]){2}\) ([0-9]){5}-([0-9]){4}/,
            'Digite um número valido (xx) xxxxx-xxxx'
          )
          .required('Campo obrigatório'),
        instructions: Yup.string().required('Campo obrigatório'),
        opening_hours: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      setIsFormValid(false)
    }
  }, [])

  const handleSubmit = useCallback(
    async (data: OrphanageFormData) => {
      data.whatsapp = data.whatsapp.replace(/[^0-9]+/g, '')

      setLoading(true)
      try {
        const formDataWithFiles = new FormData()

        // add all keys but files
        Object.keys(data).map(key => {
          if (key !== 'files') {
            formDataWithFiles.append(key, data[key])
          }
        })

        // get file list with workaround and map each file
        Array.from(data.files['']).map(file => {
          formDataWithFiles.append('files', file)
        })

        await api.post('/orphanages', formDataWithFiles)
        setLoading(false)
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
        setLoading(false)
      }
    },
    [addToast]
  )

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
            <OrphanageForm
              formRef={formRef}
              validate={performValidation}
              onSubmit={handleSubmit}
            >
              <SubmitButton
                formValid={isFormValid}
                loading={loading}
                type="submit"
              >
                Confirmar
              </SubmitButton>
            </OrphanageForm>
          </main>
        </Container>
      )}
    </>
  )
}

export default CreateOrphanage

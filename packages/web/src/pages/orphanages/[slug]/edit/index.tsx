import React, { useCallback, useEffect, useRef, useState } from 'react'

import OrphanageForm from '@/components/OrphanageForm'
import Sidebar from '@/components/Sidebar'
import SubmitButton from '@/components/SubmitButton'
import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import { FormHandles } from '@unform/core'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
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

const EditOrphanage: NextPage<{ orphanage: Orphanage }> = ({ orphanage }) => {
  const { addToast } = useToast()
  const { push } = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)

  const handleSubmit = useCallback(
    async (data: OrphanageFormData) => {
      try {
        setLoading(true)
        await api.put(`/orphanages/${orphanage.slug}`, data)
        addToast({
          title: 'Orfanato aprovado',
          type: 'info'
        })
        push('/dashboard')
        setLoading(false)
      } catch (err) {
        addToast({
          title: 'Ocorreu um erro',
          type: 'error',
          description: 'Falha ao aprovar orfanato.'
        })
        setLoading(false)
      }
    },
    [addToast, orphanage.slug, push]
  )

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

  useEffect(() => {
    formRef.current?.setData(orphanage)
  }, [orphanage])

  return (
    <>
      <Head>
        <title> {orphanage.name} | Editar</title>
      </Head>

      <Container>
        <Sidebar />

        <main>
          <OrphanageForm
            formRef={formRef}
            validate={performValidation}
            onSubmit={handleSubmit}
            orphanage={orphanage}
          >
            <SubmitButton
              formValid={isFormValid}
              loading={loading}
              type="submit"
            >
              Editar
            </SubmitButton>
          </OrphanageForm>
        </main>
      </Container>
    </>
  )
}

EditOrphanage.getInitialProps = async context => {
  const { slug } = context.query

  const token = process.browser
    ? Cookies.get('auth')
    : context.req?.headers.cookie?.replace('auth=', '')

  if (!token && !context.req) {
    Router.replace('/signin')
  }

  if (!token && context.req) {
    context.res.writeHead(302, {
      Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
    })
    context.res.end()
  }

  try {
    const response = await api.get(`/orphanages/edit/${slug}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return { orphanage: response.data }
  } catch (err) {
    if (context.req) {
      context.res.writeHead(302, {
        Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
      })
      context.res.end()
    }
  }
}

export default EditOrphanage

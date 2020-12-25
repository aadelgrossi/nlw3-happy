import React, { useCallback, useEffect, useRef } from 'react'

import OrphanageForm from '@/components/OrphanageForm'
import Sidebar from '@/components/Sidebar'
import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import { FormHandles } from '@unform/core'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

import { Container, SubmitButton } from './styles'

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
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: OrphanageFormData) => {
    try {
      await api.put(`/orphanages/${orphanage.slug}`, data)
      addToast({
        title: 'Orfanato aprovado',
        type: 'info'
      })
      router.push('/dashboard')
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro',
        type: 'error',
        description: 'Falha ao aprovar orfanato.'
      })
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
            onSubmit={handleSubmit}
            orphanage={orphanage}
          >
            <SubmitButton type="submit">Editar</SubmitButton>
          </OrphanageForm>
        </main>
      </Container>
    </>
  )
}

EditOrphanage.getInitialProps = async context => {
  const { slug } = context.query

  const cookie = process.browser
    ? Cookies.get('auth')
    : context.req?.headers.cookie?.replace('auth=', '')

  if (!cookie && !context.req) {
    Router.replace('/signin')
  }

  if (!cookie && context.req) {
    context.res.writeHead(302, {
      Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
    })
    context.res.end()
  }

  const response = await api.get(`/orphanages/${slug}`)

  return { orphanage: response.data }
}

export default EditOrphanage

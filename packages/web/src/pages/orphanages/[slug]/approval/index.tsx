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
import { FiCheck, FiXCircle } from 'react-icons/fi'

import { Container, Actions, ConfirmButton, RejectButton } from './styles'

const ApproveOrphanage: NextPage<{ orphanage: Orphanage }> = ({
  orphanage
}) => {
  const { addToast } = useToast()
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const handleConfirm = useCallback(async () => {
    const formData = formRef.current.getData()

    try {
      await api.put(`/orphanages/${orphanage.slug}`, {
        ...formData,
        images: [],
        approved: true
      })
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

  const handleReject = useCallback(async () => {
    try {
      await api.put(`/orphanages/${orphanage.slug}/reject`)
      addToast({
        title: 'Orfanato rejeitado',
        type: 'info'
      })
      router.push('/dashboard')
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro',
        type: 'error',
        description: 'Falha ao rejeitar o orfanato.'
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
            onSubmit={() => {}}
            orphanage={orphanage}
          ></OrphanageForm>
          <Actions>
            <RejectButton onClick={handleReject}>
              <FiXCircle size={24} color="#fff" />
              Recusar
            </RejectButton>
            <ConfirmButton onClick={handleConfirm}>
              <FiCheck size={24} color="#fff" />
              Aceitar
            </ConfirmButton>
          </Actions>
        </main>
      </Container>
    </>
  )
}

ApproveOrphanage.getInitialProps = async context => {
  const { slug } = context.query

  const cookie = process.browser
    ? Cookies.get('auth')
    : context.req?.headers.cookie

  if (!cookie && !context.req) {
    Router.replace('/signin')
  }

  const response = await api.get(`/orphanages/${slug}`)

  return { orphanage: response.data }
}

export default ApproveOrphanage

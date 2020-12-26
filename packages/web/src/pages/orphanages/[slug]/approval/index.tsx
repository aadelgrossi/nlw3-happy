import React, { useCallback, useEffect, useRef } from 'react'

import OrphanageForm from '@/components/OrphanageForm'
import Sidebar from '@/components/Sidebar'
import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import { FormHandles } from '@unform/core'
import fetch from 'isomorphic-unfetch'
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
  const { push } = useRouter()
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
      push('/dashboard')
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro',
        type: 'error',
        description: 'Falha ao aprovar orfanato.'
      })
    }
  }, [addToast, orphanage.slug, push])

  const handleReject = useCallback(async () => {
    try {
      await api.put(`/orphanages/${orphanage.slug}/reject`)
      addToast({
        title: 'Orfanato rejeitado',
        type: 'info'
      })
      push('/dashboard')
    } catch (err) {
      addToast({
        title: 'Ocorreu um erro',
        type: 'error',
        description: 'Falha ao rejeitar o orfanato.'
      })
    }
  }, [addToast, orphanage.slug, push])

  useEffect(() => {
    formRef.current?.setData(orphanage)
  }, [orphanage])

  return (
    <>
      <Head>
        <title> {orphanage.name} | Aprovar orfanato</title>
      </Head>

      <Container>
        <Sidebar />

        <main>
          <OrphanageForm
            formRef={formRef}
            onSubmit={() => {}}
            orphanage={orphanage}
          />
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orphanages/edit/${slug}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    const orphanage = await response.json()
    return { orphanage }
  } catch (err) {
    if (context.req) {
      context.res.writeHead(302, {
        Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
      })
      context.res.end()
    }
  }

  return { orphanage: {} }
}

export default ApproveOrphanage

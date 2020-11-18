import React, { useCallback, useEffect, useRef } from 'react'

import OrphanageForm from '@/components/OrphanageForm'
import Sidebar from '@/components/Sidebar'
import api from '@/services/api'
import { FormHandles } from '@unform/core'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { FiCheck, FiXCircle } from 'react-icons/fi'

import { Container, Actions, ConfirmButton, RejectButton } from './styles'

const EditOrphanage: NextPage<{ orphanage: Orphanage }> = ({ orphanage }) => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {}, [])

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
          ></OrphanageForm>
          <Actions>
            <RejectButton>
              <FiXCircle size={24} color="#fff" />
              Recusar
            </RejectButton>
            <ConfirmButton>
              <FiCheck size={24} color="#fff" />
              Aceitar
            </ConfirmButton>
          </Actions>
        </main>
      </Container>
    </>
  )
}

EditOrphanage.getInitialProps = async context => {
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

export default EditOrphanage

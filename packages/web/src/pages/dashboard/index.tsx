import React, { useCallback, useState } from 'react'

import OrphanageCard from '@/components/OrphanageCard'
import Sidebar from '@/components/Sidebar'
import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import Cookies from 'js-cookie'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { FiArrowLeft, FiEdit3, FiTrash } from 'react-icons/fi'

import DeleteMarker from '../../assets/delete-marker.svg'
import {
  Container,
  Contents,
  Header,
  Separator,
  OrphanagesContainer,
  Button,
  BackButton,
  DeleteButton,
  DeleteOrphanageContainer,
  DeleteOrphanageContent
} from './styles'

interface Orphanage {
  id: string
  name: string
  slug: string
  latitude: number
  longitude: number
}

interface DashboardProps {
  data: Orphanage[]
}

const Dashboard: NextPage<DashboardProps> = ({ data }) => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>(data)
  const [deleteOrphanage, setDeleteOrphanage] = useState<Orphanage>()

  const { addToast } = useToast()

  const handleDelete = useCallback(async () => {
    await api.delete(`/orphanages/${deleteOrphanage.id}`)
    addToast({
      title: 'Operação realizada',
      description: 'Orfanato removido com sucesso',
      type: 'success'
    })
    setOrphanages(current =>
      current.filter(orphanage => orphanage.id !== deleteOrphanage.id)
    )
    setDeleteOrphanage(null)
  }, [deleteOrphanage, addToast])

  return (
    <Container>
      <Head>
        <title>Happy | Dashboard</title>
      </Head>

      {deleteOrphanage ? (
        <DeleteOrphanageContainer>
          <DeleteOrphanageContent>
            <h1>Excluir!</h1>
            <p>Você tem certeza que quer excluir {deleteOrphanage.name}?</p>
            <DeleteButton onClick={handleDelete}>
              <FiTrash size={20} color="#fff"></FiTrash>
              Sim, confirmar exclusão
            </DeleteButton>

            <Link href="/dashboard">
              <BackButton onClick={() => setDeleteOrphanage(null)}>
                <FiArrowLeft size={20} color="#fff"></FiArrowLeft>
                Não, voltar ao dashboard
              </BackButton>
            </Link>
          </DeleteOrphanageContent>
          <DeleteMarker />
        </DeleteOrphanageContainer>
      ) : (
        <>
          <Sidebar />
          <Contents>
            <Header>
              <h1>Orfanatos cadastrados</h1>
              <span>{orphanages.length} orfanatos cadastrados</span>
            </Header>
            <Separator />

            <OrphanagesContainer>
              {orphanages.map(orphanage => (
                <OrphanageCard key={orphanage.id} data={orphanage}>
                  <Link href={`/orphanages/${orphanage.slug}/edit`}>
                    <Button>
                      <FiEdit3 size={24} color="#15C3D6"></FiEdit3>
                    </Button>
                  </Link>
                  <Button onClick={() => setDeleteOrphanage(orphanage)}>
                    <FiTrash size={24} color="#15C3D6"></FiTrash>
                  </Button>
                </OrphanageCard>
              ))}
            </OrphanagesContainer>
          </Contents>
        </>
      )}
    </Container>
  )
}

Dashboard.getInitialProps = async (context: NextPageContext) => {
  const cookie = process.browser
    ? Cookies.get('auth')
    : context.req?.headers.cookie

  if (!cookie && !context.req) {
    Router.replace('/signin')
  }

  if (!cookie && context.req) {
    context.res.writeHead(302, {
      Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
    })
    context.res.end()
  }

  const response = await api.get('/orphanages')
  const orphanages = response.data

  return { data: orphanages }
}

export default Dashboard

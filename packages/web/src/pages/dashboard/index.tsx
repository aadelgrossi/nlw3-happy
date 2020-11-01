import React from 'react'

import OrphanageCard from '@/components/OrphanageCard'
import Sidebar from '@/components/Sidebar'
import api from '@/services/api'
import Cookies from 'js-cookie'
import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { FiEdit3, FiTrash } from 'react-icons/fi'

import {
  Container,
  Contents,
  Header,
  Separator,
  OrphanagesContainer,
  Button
} from './styles'

interface Orphanage {
  id: string
  name: string
  slug: string
  latitude: number
  longitude: number
}

interface DashboardProps {
  orphanages: Orphanage[]
}

const Dashboard: NextPage<DashboardProps> = ({ orphanages }) => {
  return (
    <Container>
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
              <Link href={`/orphanages/${orphanage.slug}/delete`}>
                <Button>
                  <FiTrash size={24} color="#15C3D6"></FiTrash>
                </Button>
              </Link>
            </OrphanageCard>
          ))}
        </OrphanagesContainer>
      </Contents>
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

  return { orphanages }
}

export default Dashboard

import Sidebar from '@/components/Sidebar'
import { NextPage, NextPageContext } from 'next'
import React from 'react'

import SadFace from '../../../assets/logo-sad.svg'
import {
  Container,
  Contents,
  Header,
  Separator,
  OrphanagesContainer,
  NoOrphanages
} from './styles'
import Router from 'next/router'

interface Orphanage {
  id: string
  name: string
}

interface PendingProps {
  orphanages: Orphanage[]
}

const Pending: NextPage<PendingProps> = ({ orphanages }) => {
  return (
    <Container>
      <Sidebar />

      <Contents>
        <Header>
          <h1>Cadastros pendentes</h1>
          {orphanages.length > 0 && (
            <span>
              {orphanages.length} orfanato{orphanages.length > 1 ? 's' : ''}
            </span>
          )}
        </Header>
        <Separator />

        <OrphanagesContainer>
          {!orphanages.length && (
            <NoOrphanages>
              <SadFace />
              Nenhum no momento
            </NoOrphanages>
          )}
        </OrphanagesContainer>
      </Contents>
    </Container>
  )
}
Pending.getInitialProps = async (context: NextPageContext) => {
  const cookie = context.req?.headers.cookie

  const response = await fetch('http://localhost:3333/orphanages/pending', {
    credentials: 'include',
    headers: {
      cookie: cookie
    }
  })
  const json = await response.json()

  if (response.status === 401 && !context.req) {
    Router.replace('/signin')
  }

  if (response.status === 401 && context.req) {
    context.res.writeHead(302, {
      Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
    })
    context.res.end()
  }
  return { orphanages: json }
}

export default Pending

import React from 'react'

import OrphanageCard from '@/components/OrphanageCard'
import AuthenticatedSidebar from '@/components/Sidebar/Authenticated'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { FiArrowRight } from 'react-icons/fi'

import SadFace from '../../../assets/logo-sad.svg'
import {
  Container,
  Contents,
  Header,
  Separator,
  Button,
  OrphanagesContainer,
  NoOrphanages
} from './styles'

const Pending: NextPage<{ orphanages: Orphanage[] }> = ({ orphanages }) => {
  return (
    <Container>
      <Head>
        <title>Happy | Orfanatos pendentes</title>
      </Head>
      <AuthenticatedSidebar />

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
          {!orphanages.length ? (
            <NoOrphanages>
              <SadFace />
              Nenhum no momento
            </NoOrphanages>
          ) : (
            orphanages.map(orphanage => (
              <OrphanageCard data={orphanage} key={orphanage.id}>
                <Link href={`/orphanages/${orphanage.slug}/approval`}>
                  <Button>
                    <FiArrowRight size={24} color="#15C3D6"></FiArrowRight>
                  </Button>
                </Link>
              </OrphanageCard>
            ))
          )}
        </OrphanagesContainer>
      </Contents>
    </Container>
  )
}
Pending.getInitialProps = async (context: NextPageContext) => {
  const authToken = process.browser
    ? Cookies.get('auth')
    : context.req?.headers.cookie?.replace('auth=', '')

  if (!authToken && !context.req) {
    Router.replace('/signin')
  }

  if (!authToken && context.req) {
    context.res.writeHead(302, {
      Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
    })
    context.res.end()
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orphanages/pending`,
      { headers: { Authorization: `Bearer ${authToken}` } }
    )

    const data = await response.json()

    return { orphanages: data }
  } catch (error) {
    if (context.req) {
      context.res.writeHead(302, {
        Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
      })
      context.res.end()
    }
    return { orphanages: [] }
  }
}

export default Pending

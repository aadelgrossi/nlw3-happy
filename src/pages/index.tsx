import React from 'react'
import Head from 'next/head'

import { Container } from '@/styles/pages/Landing'
import Logo from '../assets/logo.svg'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Happy</title>
      </Head>

      <Logo />
    </Container>
  )
}

export default Home

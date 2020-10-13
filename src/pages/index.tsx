import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { FiArrowRight } from 'react-icons/fi'
import {
  Container,
  Wrapper,
  LeftSection,
  Location,
  EnterAppButton
} from '@/styles/pages/Landing'
import Logo from '../assets/logo.svg'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Happy</title>
      </Head>

      <Wrapper>
        <Logo />

        <LeftSection>
          <h1>Leve felicidade para o mundo</h1>

          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </LeftSection>

        <Location>
          <strong>Paranavaí</strong>
          <span>Paraná</span>
        </Location>

        <Link href="/map">
          <EnterAppButton>
            <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
          </EnterAppButton>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default Home

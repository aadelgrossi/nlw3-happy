import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Container, PageMap, CreateOrphanageButton } from '@/styles/pages/Map'
import MapMarker from '../assets/map-marker.svg'
import { FiPlus } from 'react-icons/fi'

const Map: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Happy | Escolha um orfanato </title>
      </Head>

      <PageMap>
        <aside>
          <header>
            <MapMarker />
            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estão esperando a sua visita</p>
          </header>

          <footer>
            <strong>Paranavaí</strong>
            <span>Paraná</span>
          </footer>
        </aside>

        <div />
        <Link href="">
          <CreateOrphanageButton>
            <FiPlus size={32} color="#fff" />
          </CreateOrphanageButton>
        </Link>
      </PageMap>
    </Container>
  )
}

export default Map

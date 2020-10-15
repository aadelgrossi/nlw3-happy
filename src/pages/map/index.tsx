import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Container, PageMap, CreateOrphanageButton } from './styles'
import MapMarker from '../../assets/map-marker.svg'
import { FiPlus } from 'react-icons/fi'

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('../../components/Marker'), {
  ssr: false
})

const OrphanageMap: React.FC = () => {
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

        <MapWithNoSSR
          center={[-23.0794493, -52.4684549]}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          <MarkerWithNoSSR
            position={[-23.0794617, -52.4674024]}
          ></MarkerWithNoSSR>
        </MapWithNoSSR>

        <Link href="/orphanages/create">
          <CreateOrphanageButton>
            <FiPlus size={32} color="#fff" />
          </CreateOrphanageButton>
        </Link>
      </PageMap>
    </Container>
  )
}

export default OrphanageMap

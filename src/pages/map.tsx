import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Container, PageMap, CreateOrphanageButton } from '@/styles/pages/Map'
import MapMarker from '../assets/map-marker.svg'
import { FiPlus } from 'react-icons/fi'

const Map = dynamic(() => import('react-leaflet/lib/Map'), {
  ssr: false
})

const TileLayer = dynamic(() => import('react-leaflet/lib/TileLayer'), {
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

        <Map
          center={[-23.0840144, -52.4582038]}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}`}
          ></TileLayer>
        </Map>

        <Link href="">
          <CreateOrphanageButton>
            <FiPlus size={32} color="#fff" />
          </CreateOrphanageButton>
        </Link>
      </PageMap>
    </Container>
  )
}

export default OrphanageMap

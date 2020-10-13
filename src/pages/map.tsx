import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Map, TileLayer } from 'react-leaflet'

import { Container, PageMap, CreateOrphanageButton } from '@/styles/pages/Map'
import MapMarker from '../assets/map-marker.svg'
import { FiPlus } from 'react-icons/fi'

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
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
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

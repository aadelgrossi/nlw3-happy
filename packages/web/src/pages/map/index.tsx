import React, { useEffect, useState } from 'react'

import api from '@/services/api'
import { LatLngExpression } from 'leaflet'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { FiArrowRight, FiPlus } from 'react-icons/fi'

import MapMarker from '../../assets/map-marker.svg'
import { Container, CreateOrphanageButton, PageMap } from './styles'

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('../../components/Marker'), {
  ssr: false
})

const OrphanageMap: NextPage<{ orphanages: Orphanage[] }> = ({
  orphanages
}) => {
  const [location, setLocation] = useState<LatLngExpression>([
    -23.0878701,
    -52.4666419
  ])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocation([coords.latitude, coords.longitude])
    })
  }, [])

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
          center={location}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          {orphanages.map(orphanage => (
            <MarkerWithNoSSR
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              name={orphanage.name}
            >
              <Link href={`orphanages/${orphanage.slug}`}>
                <a>
                  <FiArrowRight size={32} color="#fff"></FiArrowRight>
                </a>
              </Link>
            </MarkerWithNoSSR>
          ))}
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

OrphanageMap.getInitialProps = async () => {
  const response = await api.get<Orphanage[]>('/orphanages')
  const orphanages = response.data

  return { orphanages }
}

export default OrphanageMap

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Container, PageMap, CreateOrphanageButton } from './styles'
import MapMarker from '../../assets/map-marker.svg'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import api from '@/services/api'

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('../../components/Marker'), {
  ssr: false
})

interface Orphanage {
  id: string
  latitude: number
  longitude: number
  name: string
}

const OrphanageMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
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
          center={[-23.0878701, -52.4666419]}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          {orphanages.map(orphanage => (
            <MarkerWithNoSSR
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              name={orphanage.name}
            >
              <Link href={`orphanages/${orphanage.id}`}>
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

export default OrphanageMap

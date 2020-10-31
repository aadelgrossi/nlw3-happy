import Sidebar from '@/components/Sidebar'
import api from '@/services/api'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import { FiEdit3, FiTrash } from 'react-icons/fi'

import {
  Container,
  Contents,
  Header,
  Separator,
  OrphanagesContainer,
  OrphanageDetails,
  Item,
  Button,
  ButtonGroup
} from './styles'

interface Orphanage {
  id: string
  name: string
  slug: string
  latitude: number
  longitude: number
}

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('@/components/Marker'), {
  ssr: false
})

interface DashboardProps {
  orphanages: Orphanage[]
}

const Dashboard: NextPage<DashboardProps> = ({ orphanages }) => {
  return (
    <Container>
      <Sidebar />
      <Contents>
        <Header>
          <h1>Orfanatos cadastrados</h1>
          <span>{orphanages.length} orfanatos cadastrados</span>
        </Header>
        <Separator />

        <OrphanagesContainer>
          {orphanages.map(orphanage => (
            <Item key={orphanage.id}>
              <MapWithNoSSR
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={15}
                style={{
                  width: '100%',
                  height: 240,
                  border: '1px solid #DDE3F0',
                  borderRadius: 20
                }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <MarkerWithNoSSR
                  name={orphanage.name}
                  interactive={false}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </MapWithNoSSR>

              <OrphanageDetails>
                <h2>{orphanage.name}</h2>
                <ButtonGroup>
                  <Link href={`/orphanages/${orphanage.slug}/edit`}>
                    <Button>
                      <FiEdit3 size={24} color="#15C3D6"></FiEdit3>
                    </Button>
                  </Link>
                  <Link href={`/orphanages/${orphanage.slug}/delete`}>
                    <Button>
                      <FiTrash size={24} color="#15C3D6"></FiTrash>
                    </Button>
                  </Link>
                </ButtonGroup>
              </OrphanageDetails>
            </Item>
          ))}
        </OrphanagesContainer>
      </Contents>
    </Container>
  )
}

Dashboard.getInitialProps = async () => {
  const response = await api.get('/orphanages')
  const orphanages = response.data

  return { orphanages }
}

export default Dashboard

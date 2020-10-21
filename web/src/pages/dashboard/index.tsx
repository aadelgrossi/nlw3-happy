import Sidebar from '@/components/Sidebar'
// import { useAuth } from '@/hooks/auth'
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

interface User {
  id: string
  name: string
  email: string
}

interface UserProps {
  user: User
}

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('@/components/Marker'), {
  ssr: false
})

const Dashboard: React.FC<UserProps> = () => {
  // const { isAuthenticated, user } = useAuth()

  return (
    <Container>
      <Sidebar />
      {/* <h1>dashboard</h1>
      <p>Estou autenticado? {isAuthenticated ? 'Sim' : 'não'}</p>
      {user && user.email} */}
      <Contents>
        <Header>
          <h1>Orfanatos cadastrados</h1>
          <span>2 orfanatos cadastrados</span>
        </Header>
        <Separator />

        <OrphanagesContainer>
          <Item>
            <MapWithNoSSR
              center={[-23.0878701, -52.4666419]}
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
                name="orfanato"
                interactive={false}
                position={[-23.0878701, -52.4666419]}
              />
            </MapWithNoSSR>
            <OrphanageDetails>
              <h2>Orfanato Esperança</h2>
              <ButtonGroup>
                <Link href="/orphanages">
                  <Button>
                    <FiEdit3 size={24} color="#15C3D6"></FiEdit3>
                  </Button>
                </Link>
                <Link href="/orphanages/delete">
                  <Button>
                    <FiTrash size={24} color="#15C3D6"></FiTrash>
                  </Button>
                </Link>
              </ButtonGroup>
            </OrphanageDetails>
          </Item>
          <Item>
            <MapWithNoSSR
              center={[-23.0878701, -52.4666419]}
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
                name="orfanato"
                interactive={false}
                position={[-23.0878701, -52.4666419]}
              />
            </MapWithNoSSR>
            <OrphanageDetails>
              <h2>Orfanato Esperança</h2>
              <ButtonGroup>
                <Link href="/orphanages">
                  <Button>
                    <FiEdit3 size={24} color="#15C3D6"></FiEdit3>
                  </Button>
                </Link>
                <Link href="/orphanages/delete">
                  <Button>
                    <FiTrash size={24} color="#15C3D6"></FiTrash>
                  </Button>
                </Link>
              </ButtonGroup>
            </OrphanageDetails>
          </Item>
          <Item>
            <MapWithNoSSR
              center={[-23.0878701, -52.4666419]}
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
                name="orfanato"
                interactive={false}
                position={[-23.0878701, -52.4666419]}
              />
            </MapWithNoSSR>
            <OrphanageDetails>
              <h2>Orfanato Esperança</h2>
              <ButtonGroup>
                <Link href="/orphanages">
                  <Button>
                    <FiEdit3 size={24} color="#15C3D6"></FiEdit3>
                  </Button>
                </Link>
                <Link href="/orphanages/delete">
                  <Button>
                    <FiTrash size={24} color="#15C3D6"></FiTrash>
                  </Button>
                </Link>
              </ButtonGroup>
            </OrphanageDetails>
          </Item>
          <Item>
            <MapWithNoSSR
              center={[-23.0878701, -52.4666419]}
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
                name="orfanato"
                interactive={false}
                position={[-23.0878701, -52.4666419]}
              />
            </MapWithNoSSR>
            <OrphanageDetails>
              <h2>Orfanato Esperança</h2>
              <ButtonGroup>
                <Link href="/orphanages">
                  <Button>
                    <FiEdit3 size={24} color="#15C3D6"></FiEdit3>
                  </Button>
                </Link>
                <Link href="/orphanages/delete">
                  <Button>
                    <FiTrash size={24} color="#15C3D6"></FiTrash>
                  </Button>
                </Link>
              </ButtonGroup>
            </OrphanageDetails>
          </Item>
        </OrphanagesContainer>
      </Contents>
    </Container>
  )
}

export default Dashboard

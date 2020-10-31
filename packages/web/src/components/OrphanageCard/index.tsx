import dynamic from 'next/dynamic'
import React from 'react'

import { Container, OrphanageDetails, ButtonGroup } from './styles'

interface CardProps {
  data: {
    name: string
    latitude: number
    longitude: number
  }
}

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('@/components/Marker'), {
  ssr: false
})

const OrphanageCard: React.FC<CardProps> = ({ data, children }) => {
  return (
    <Container>
      <MapWithNoSSR
        center={[data.latitude, data.longitude]}
        zoom={15}
        style={{
          width: '100%',
          height: 227,
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
          name={data.name}
          interactive={false}
          position={[data.latitude, data.longitude]}
        />
      </MapWithNoSSR>

      <OrphanageDetails>
        <h2>{data.name}</h2>
        <ButtonGroup>{children}</ButtonGroup>
      </OrphanageDetails>
    </Container>
  )
}

export default OrphanageCard

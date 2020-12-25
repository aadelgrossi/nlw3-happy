import React from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  Container,
  OrphanageDetails,
  ButtonGroup,
  TooltipContainer
} from './styles'

interface CardProps {
  data: {
    name: string
    slug: string
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
        <TooltipContainer>
          {data.name.length >= 30 && <span>{data.name}</span>}
          <Link href={`/orphanages/${data.slug}`}>
            <h2>{data.name}</h2>
          </Link>
        </TooltipContainer>

        <ButtonGroup>{children}</ButtonGroup>
      </OrphanageDetails>
    </Container>
  )
}

export default OrphanageCard

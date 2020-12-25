import React from 'react'

import MapMarker from '../../assets/map-marker.svg'
import LowerSection from './LowerSection'
import { Container } from './styles'

const DefaultSidebar: React.FC = () => {
  return (
    <Container>
      <MapMarker />

      <LowerSection />
    </Container>
  )
}

export default DefaultSidebar

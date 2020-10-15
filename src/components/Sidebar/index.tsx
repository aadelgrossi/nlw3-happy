import React from 'react'

import { Container, Footer } from './styles'

import MapMarker from '../../assets/map-marker.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { useRouter } from 'next/router'

const Sidebar: React.FC = () => {
  const router = useRouter()
  return (
    <Container>
      <MapMarker />

      <Footer>
        <button type="button" onClick={router.back}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </Footer>
    </Container>
  )
}

export default Sidebar

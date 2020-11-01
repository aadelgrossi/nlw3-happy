import React from 'react'

import Logo from '../../assets/logo.svg'
import { Container, Location } from './styles'

const LogoContainer: React.FC = () => {
  return (
    <Container>
      <Logo />

      <Location>
        <strong>Paranavaí</strong>
        <span>Paraná</span>
      </Location>
    </Container>
  )
}

export default LogoContainer

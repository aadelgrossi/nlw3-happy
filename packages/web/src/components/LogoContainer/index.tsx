import React from 'react'

import { Container, Location } from './styles'
import Logo from '../../assets/logo.svg'

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

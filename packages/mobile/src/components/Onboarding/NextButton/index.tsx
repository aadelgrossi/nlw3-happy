import React from 'react'

import { Feather } from '@expo/vector-icons'

import { Container } from './styles'

export const NextButton: React.FC = props => {
  return (
    <Container {...props}>
      <Feather name="arrow-right" size={25} color="#15C3D6"></Feather>
    </Container>
  )
}

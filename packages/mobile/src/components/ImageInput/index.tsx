import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import { Container, PlusIcon } from './styles'

export const ImageInput: React.FC<TouchableOpacityProps> = props => {
  return (
    <Container {...props}>
      <PlusIcon />
    </Container>
  )
}

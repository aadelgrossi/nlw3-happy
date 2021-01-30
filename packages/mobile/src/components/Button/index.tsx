import React from 'react'

import { RectButtonProperties } from 'react-native-gesture-handler'

import { Container, ButtonText } from './styles'

interface ButtonProps extends RectButtonProperties {
  confirm?: boolean
  onPress(e: any): void
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <ButtonText>{children}</ButtonText>
    </Container>
  )
}

Button.defaultProps = {
  confirm: false
}

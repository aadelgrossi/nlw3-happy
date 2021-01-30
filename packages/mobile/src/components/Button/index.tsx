import React from 'react'

import { ActivityIndicator } from 'react-native'
import { RectButtonProperties } from 'react-native-gesture-handler'

import { Container, ButtonText } from './styles'

interface ButtonProps extends RectButtonProperties {
  confirm?: boolean
  loading?: boolean
  onPress(e: any): void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...props
}) => {
  return (
    <Container {...props}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </Container>
  )
}

Button.defaultProps = {
  confirm: false
}

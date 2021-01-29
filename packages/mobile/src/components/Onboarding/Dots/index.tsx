import React from 'react'

import { DotProps } from 'react-native-onboarding-swiper'

import { Container } from './styles'

export const Dots: React.FC<DotProps> = props => {
  return <Container {...props} />
}

import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import { Container, OptionText } from './styles'

interface ControlOptionProps extends TouchableOpacityProps {
  label: 'Sim' | 'Não'
  active: boolean
}

export const SegmentedControlOption: React.FC<ControlOptionProps> = props => {
  const { active, label } = props

  return (
    <Container {...props}>
      <OptionText active={active} label={label}>
        {props.label}
      </OptionText>
    </Container>
  )
}

import React, { useMemo } from 'react'

import { Feather } from '@expo/vector-icons'

import { Container, Text } from './styles'

interface BadgeProps {
  type: 'opening_hours' | 'open_on_weekends' | 'closed_on_weekends'
  value?: string
}

export const InstructionsBadge: React.FC<BadgeProps> = ({ value, type }) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'opening_hours':
        return <Feather name="clock" size={40} color="#2AB5D1" />
      case 'open_on_weekends':
        return <Feather name="info" size={40} color="#39CC83" />
      case 'closed_on_weekends':
        return <Feather name="info" size={40} color="#ff669d" />
    }
  }, [type])

  return (
    <Container type={type}>
      {icon}
      <Text type={type}>{value}</Text>
    </Container>
  )
}

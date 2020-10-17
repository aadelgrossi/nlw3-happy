import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'

import { Container, Title, BackButton, DismissButton } from './styles'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

interface HeaderProps {
  title: string
  showDismiss?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, showDismiss = true }) => {
  const navigation = useNavigation()

  const handleDismissButton = useCallback(() => {
    navigation.navigate('OrphanagesMap')
  }, [])

  return (
    <Container>
      <BackButton>
        <Feather
          name="arrow-left"
          size={24}
          color="#15b6d6"
          onPress={navigation.goBack}
        ></Feather>
      </BackButton>

      <Title>{title}</Title>

      {showDismiss ? (
        <DismissButton>
          <Feather
            name="x"
            size={24}
            color="#ff669d"
            onPress={handleDismissButton}
          ></Feather>
        </DismissButton>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </Container>
  )
}

export default Header

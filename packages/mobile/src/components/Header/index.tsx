import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Title,
  BackButton,
  DismissButton,
  EmptyButtonSpace,
  DismissIcon,
  LeftArrowIcon
} from './styles'

interface HeaderProps {
  title?: string
  showDismiss?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Adicione um orfanato',
  showDismiss = true
}) => {
  const navigation = useNavigation()

  const handleDismissButton = useCallback(() => {
    navigation.navigate('CancelPrompt')
  }, [navigation])

  return (
    <Container>
      <BackButton>
        <LeftArrowIcon onPress={navigation.goBack} />
      </BackButton>

      <Title>{title}</Title>

      {showDismiss ? (
        <DismissButton>
          <DismissIcon onPress={handleDismissButton} />
        </DismissButton>
      ) : (
        <EmptyButtonSpace />
      )}
    </Container>
  )
}

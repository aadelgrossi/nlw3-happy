import React from 'react'

import { Feather } from '@expo/vector-icons'
import { CompositeNavigationProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from 'react-native'

import {
  CreateOrphanageParamList,
  InitialRoutesParamList
} from '~/routes/types'

import {
  Container,
  Title,
  CrossIconWrapper,
  BaseButton,
  ButtonOutline,
  ButtonText,
  Message,
  ButtonGroup
} from './styles'

interface CancelPrompt {
  navigation: CompositeNavigationProp<
    StackNavigationProp<CreateOrphanageParamList, 'CancelPrompt'>,
    StackNavigationProp<InitialRoutesParamList>
  >
}

export const CancelPrompt: React.FC<CancelPrompt> = ({ navigation }) => {
  return (
    <>
      <Container>
        <CrossIconWrapper>
          <Feather name="x" size={32} color="#FF669D" />
        </CrossIconWrapper>
        <Title>Cancelar cadastro</Title>
        <Message>Tem certeza que quer cancelar esse cadastro?</Message>

        <ButtonGroup>
          <ButtonOutline onPress={navigation.goBack}>
            <ButtonText>Não</ButtonText>
          </ButtonOutline>

          <BaseButton onPress={() => navigation.navigate('OrphanagesMap')}>
            <ButtonText>Sim</ButtonText>
          </BaseButton>
        </ButtonGroup>
      </Container>
      <StatusBar barStyle="light-content" />
    </>
  )
}

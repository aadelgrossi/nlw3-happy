import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'

import { success } from '~/images'

import {
  Container,
  Illustration,
  Title,
  Message,
  Button,
  ButtonText
} from './styles'

export const SuccessPrompt: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Container>
        <Illustration source={success} />
        <Title>Ebaaa!</Title>
        <Message>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </Message>

        <Button onPress={() => navigation.navigate('OrphanagesMap')}>
          <ButtonText>Ok</ButtonText>
        </Button>
      </Container>
      <StatusBar barStyle="light-content" />
    </>
  )
}

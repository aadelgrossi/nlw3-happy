import React from 'react'

import { Feather } from '@expo/vector-icons'

import {
  Container,
  Title,
  Input,
  ImagesInput,
  Label,
  NextButton,
  NextButtonText,
  SwitchContainer
} from './styles'
import { Switch } from 'react-native'

const OrphanageData: React.FC = () => {
  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>

      <Label>Sobre</Label>
      <Input multiline style={{ height: 110 }} />

      <Label>WhatsApp</Label>
      <Input />

      <Label>Fotos</Label>
      <ImagesInput onPress={() => {}}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Title>Visitação</Title>

      <Label>Instruções</Label>
      <Input multiline style={{ height: 110 }} />

      <Label>Horário de visitas</Label>
      <Input />

      <SwitchContainer>
        <Label>Abre no final de semana?</Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </SwitchContainer>

      <NextButton onPress={() => {}}>
        <NextButtonText>Cadastrar</NextButtonText>
      </NextButton>
    </Container>
  )
}

export default OrphanageData

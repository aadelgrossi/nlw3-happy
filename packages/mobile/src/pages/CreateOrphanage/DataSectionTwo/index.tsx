import React, { useState } from 'react'

import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { Switch } from 'react-native'

import {
  CreateOrphanageParamList,
  InitialRoutesParamList
} from '~/routes/types'
import api from '~/services/api'

import {
  Container,
  Title,
  Label,
  Input,
  SwitchContainer,
  ConfirmButton,
  ButtonText,
  LabelWrapper,
  TitleWrapper,
  StepItemText,
  CurrentStep
} from '../styles'

interface DataSectionTwoProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<CreateOrphanageParamList, 'DataSectionTwo'>,
    StackNavigationProp<InitialRoutesParamList>
  >
  route: RouteProp<CreateOrphanageParamList, 'DataSectionTwo'>
}

export const DataSectionTwo: React.FC<DataSectionTwoProps> = ({
  route,
  navigation
}) => {
  const { orphanage: firstStepData } = route.params

  const [instructions, setInstructions] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [openOnWeekends, setOpenOnWeekends] = useState(false)

  const handleCreateOrphanage = async () => {
    const { latitude, longitude, name, about, images } = firstStepData
    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', openingHours)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('open_on_weekends', String(openOnWeekends))

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
        uri: image
      } as any)
    })

    api
      .post('/orphanages', data)
      .then(() => {
        // Toast.show('Orfanato cadastrado com sucesso.')
        alert('sucesso')
        // confirm
        navigation.navigate('OrphanagesMap')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container>
      <TitleWrapper>
        <Title>Visitação</Title>
        <LabelWrapper>
          <StepItemText>01 - </StepItemText>
          <CurrentStep>02</CurrentStep>
        </LabelWrapper>
      </TitleWrapper>

      <Label>Instruções</Label>
      <Input
        multiline
        style={{ height: 110 }}
        value={instructions}
        onChangeText={setInstructions}
      />

      <Label>Horário de visitas</Label>
      <Input value={openingHours} onChangeText={setOpeningHours} />

      <SwitchContainer>
        <Label>Abre no final de semana?</Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={openOnWeekends}
          onValueChange={setOpenOnWeekends}
        />
      </SwitchContainer>

      <ConfirmButton onPress={handleCreateOrphanage}>
        <ButtonText>Confirmar</ButtonText>
      </ConfirmButton>
    </Container>
  )
}

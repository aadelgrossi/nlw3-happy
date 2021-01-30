import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { useForm } from 'react-hook-form'
import { Switch } from 'react-native'

import { Button, Input } from '~/components'
import {
  CreateOrphanageParamList,
  InitialRoutesParamList
} from '~/routes/types'
import api from '~/services/api'

import {
  Container,
  Title,
  Label,
  SwitchContainer,
  LabelWrapper,
  TitleWrapper,
  StepItemText,
  CurrentStep
} from '../styles'
import { OrphanageSectionTwoFormData } from '../types'
import schema from './schema'

interface DataSectionTwoProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<CreateOrphanageParamList, 'DataSectionTwo'>,
    StackNavigationProp<InitialRoutesParamList>
  >
  route: RouteProp<CreateOrphanageParamList, 'DataSectionTwo'>
}

export const DataSectionTwo: React.FC<DataSectionTwoProps> = ({
  route: {
    params: { orphanage }
  },
  navigation
}) => {
  const [openOnWeekends, setOpenOnWeekends] = useState(false)

  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm<OrphanageSectionTwoFormData>({
    defaultValues: {
      instructions: '',
      opening_hours: '',
      open_on_weekends: false
    },
    resolver: yupResolver(schema)
  })

  const createOrphanage = async (data: OrphanageSectionTwoFormData) => {
    const { latitude, longitude, name, about, images } = orphanage
    const formData = new FormData()

    formData.append('name', name)
    formData.append('about', about)
    formData.append('instructions', data.instructions)
    formData.append('opening_hours', data.opening_hours)
    formData.append('latitude', String(latitude))
    formData.append('longitude', String(longitude))
    formData.append('open_on_weekends', String(openOnWeekends))

    images.forEach((image, index) => {
      formData.append('images', {
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
        name="instructions"
        control={control}
        multiline
        style={{ height: 110 }}
        errors={errors.instructions}
      />

      <Label>Horário de visitas</Label>
      <Input
        name="opening_hours"
        control={control}
        errors={errors.opening_hours}
      />

      <SwitchContainer>
        <Label>Abre no final de semana?</Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={openOnWeekends}
          onValueChange={setOpenOnWeekends}
        />
      </SwitchContainer>

      <Button
        onPress={handleSubmit(createOrphanage)}
        confirm
        loading={isSubmitting}
      >
        Confirmar
      </Button>
    </Container>
  )
}

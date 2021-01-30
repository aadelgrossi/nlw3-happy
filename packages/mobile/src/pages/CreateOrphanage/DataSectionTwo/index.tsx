import React, { useCallback, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

import {
  Button,
  Input,
  SegmentedControl,
  SegmentedControlOption
} from '~/components'
import {
  CreateOrphanageParamList,
  InitialRoutesParamList
} from '~/routes/types'
import api from '~/services/api'

import {
  Title,
  Label,
  Form,
  LabelWrapper,
  TitleWrapper,
  StepItemText,
  CurrentStep
} from '../styles'
import { OrphanageSectionTwoFormData } from '../types'
import schema from './schema'
import { Container } from './styles'

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
  const [openOnWeekends, setOpenOnWeekends] = useState(true)

  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm<OrphanageSectionTwoFormData>({
    defaultValues: {
      instructions: '',
      opening_hours: ''
    },
    resolver: yupResolver(schema)
  })

  const createOrphanage = useCallback(
    async ({ instructions, opening_hours }: OrphanageSectionTwoFormData) => {
      const { name, latitude, longitude, about, images, whatsapp } = orphanage
      const data = new FormData()

      data.append('name', name)
      data.append('about', about)
      data.append('instructions', instructions)
      data.append('whatsapp', whatsapp)
      data.append('opening_hours', opening_hours)
      data.append('latitude', String(latitude))
      data.append('longitude', String(longitude))
      data.append('open_on_weekends', String(openOnWeekends))

      images.forEach((image, index) => {
        data.append('files', {
          name: `${slugify(name, {
            lower: true
          })}-${index + 1}.jpg`,
          type: 'image/jpeg',
          uri: image
        } as any)
      })
      api
        .post('/orphanages', data)
        .then(() => {
          alert('sucesso')
          navigation.navigate('OrphanagesMap')
        })
        .catch(err => {
          console.log(err)
        })
    },
    [orphanage, openOnWeekends, navigation]
  )

  const toggleOpenOnWeekends = useCallback(() => {
    setOpenOnWeekends(state => !state)
  }, [])

  return (
    <Container>
      <Form>
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

        <Label>Atende final de semana?</Label>
        <SegmentedControl>
          <SegmentedControlOption
            label="Sim"
            active={openOnWeekends}
            onPress={toggleOpenOnWeekends}
          />
          <SegmentedControlOption
            label="Não"
            active={!openOnWeekends}
            onPress={toggleOpenOnWeekends}
          />
        </SegmentedControl>
      </Form>

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

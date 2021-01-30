import React, { useCallback, useState, useEffect } from 'react'

import { Feather } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { useForm } from 'react-hook-form'

import { Input, Button } from '~/components'
import { CreateOrphanageParamList } from '~/routes/types'

import {
  Container,
  Title,
  Label,
  CurrentStep,
  StepItemText,
  TitleWrapper,
  LabelWrapper
} from '../styles'
import validationSchema from './schema'
import { ImagesInput, UploadedImage, UploadedImagesContainer } from './styles'

interface OrphanageDataProps {
  navigation: StackNavigationProp<CreateOrphanageParamList, 'DataSectionOne'>
  route: RouteProp<CreateOrphanageParamList, 'DataSectionOne'>
}

export const DataSectionOne: React.FC<OrphanageDataProps> = ({
  route,
  navigation
}) => {
  const [images, setImages] = useState<string[]>([])
  const {
    position: { latitude, longitude }
  } = route.params

  const {
    control,
    handleSubmit,
    errors,
    getValues
  } = useForm<OrphanagePartialFormData>({
    defaultValues: {
      name: '',
      about: '',
      whatsapp: '',
      images: []
    },
    resolver: yupResolver(validationSchema)
  })

  const handleSelectImages = useCallback(async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [5, 4],
      mediaTypes: MediaTypeOptions.Images
    })

    if (!result.cancelled) {
      const { uri: image } = result as ImageInfo
      setImages(prevState => [...prevState, image])
    }
  }, [])

  const nextStep = useCallback(() => {
    navigation.navigate('DataSectionTwo', {
      orphanage: { ...getValues(), latitude, longitude, images }
    })
  }, [])

  useEffect(() => {
    console.log({ latitude, longitude })

    console.log({ errors })
  }, [errors, getValues, latitude, longitude])

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <TitleWrapper>
        <Title>Dados</Title>
        <LabelWrapper>
          <CurrentStep>01 </CurrentStep>
          <StepItemText> - 02</StepItemText>
        </LabelWrapper>
      </TitleWrapper>

      <Label>Nome</Label>
      <Input control={control} name="name" errors={errors.name} />

      <LabelWrapper>
        <Label>Sobre</Label>
        <StepItemText>Máximo de 300 caracteres</StepItemText>
      </LabelWrapper>

      <Input
        control={control}
        name="about"
        errors={errors.about}
        multiline
        style={{ height: 110 }}
      />

      <Label>Número de WhatsApp</Label>
      <Input
        control={control}
        name="whatsapp"
        errors={errors.whatsapp}
        keyboardType="number-pad"
        maxLength={11}
      />

      <Label>Fotos</Label>
      <UploadedImagesContainer>
        {images.map(image => (
          <UploadedImage key={image} source={{ uri: image }} />
        ))}
      </UploadedImagesContainer>

      <ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Button onPress={handleSubmit(nextStep)}>Próximo</Button>
    </Container>
  )
}

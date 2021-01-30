import React, { useCallback, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

import { CreateOrphanageParamList } from '~/routes/types'

import {
  Container,
  Title,
  Input,
  Label,
  NextButton,
  CurrentStep,
  StepItemText,
  TitleWrapper,
  LabelWrapper,
  ButtonText
} from '../styles'
import { ImagesInput, UploadedImage, UploadedImagesContainer } from './styles'

interface OrphanageDataProps {
  navigation: StackNavigationProp<CreateOrphanageParamList, 'DataSectionOne'>
  route: RouteProp<CreateOrphanageParamList, 'DataSectionOne'>
}

export const DataSectionOne: React.FC<OrphanageDataProps> = ({
  route,
  navigation
}) => {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [images, setImages] = useState<string[]>([])

  const {
    position: { latitude, longitude }
  } = route.params

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

  const handleNext = useCallback(() => {
    navigation.navigate('DataSectionTwo', {
      orphanage: { name, about, latitude, longitude, whatsapp, images }
    })
  }, [])

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
      <Input value={name} onChangeText={setName} />

      <LabelWrapper>
        <Label>Sobre</Label>
        <StepItemText>Máximo de 300 caracteres</StepItemText>
      </LabelWrapper>

      <Input
        multiline
        style={{ height: 110 }}
        value={about}
        onChangeText={setAbout}
      />

      <Label>Número de WhatsApp</Label>
      <Input value={whatsapp} onChangeText={setWhatsapp} />

      <Label>Fotos</Label>

      <UploadedImagesContainer>
        {images.map(image => (
          <UploadedImage key={image} source={{ uri: image }} />
        ))}
      </UploadedImagesContainer>

      <ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <NextButton onPress={handleNext}>
        <ButtonText>Próximo</ButtonText>
      </NextButton>
    </Container>
  )
}

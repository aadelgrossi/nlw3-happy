import React, { useCallback, useState, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { useForm } from 'react-hook-form'
import { TextInput } from 'react-native'

import { Input, Button, ImageInput, ImagePreview } from '~/components'
import { CreateOrphanageParamList } from '~/routes/types'

import {
  Container,
  Form,
  Title,
  Label,
  CurrentStep,
  StepItemText,
  TitleWrapper,
  LabelWrapper
} from '../styles'
import { OrphanageSectionOneFormData } from '../types'
import validationSchema from './schema'
import { UploadedImagesContainer, RemoveImage, DismissIcon } from './styles'

interface OrphanageDataProps {
  navigation: StackNavigationProp<CreateOrphanageParamList, 'DataSectionOne'>
  route: RouteProp<CreateOrphanageParamList, 'DataSectionOne'>
}

export const DataSectionOne: React.FC<OrphanageDataProps> = ({
  route,
  navigation
}) => {
  const aboutRef = React.useRef<TextInput>(null)
  const whatsappRef = React.useRef<TextInput>(null)
  const [images, setImages] = useState<ImageInfo[]>([])
  const { position } = route.params

  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm<OrphanageSectionOneFormData>({
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
      quality: 0.6,
      aspect: [5, 4],
      base64: true,
      mediaTypes: MediaTypeOptions.Images
    })

    if (!result.cancelled) {
      const image = result as ImageInfo
      setImages(prevState => [...prevState, image])
    }
  }, [])

  const nextStep = useCallback(
    (data: OrphanageSectionOneFormData) => {
      const orphanage = {
        ...data,
        ...position,
        images: images.map(i => i.uri)
      }

      navigation.navigate('DataSectionTwo', {
        orphanage
      })
    },
    [images, position, navigation]
  )

  const removeImage = useCallback((uri: string) => {
    setImages(prevState => prevState.filter(image => image.uri !== uri))
  }, [])

  return (
    <Container>
      <Form>
        <TitleWrapper>
          <Title>Dados</Title>
          <LabelWrapper>
            <CurrentStep>01 </CurrentStep>
            <StepItemText> - 02</StepItemText>
          </LabelWrapper>
        </TitleWrapper>
        <Label>Nome</Label>
        <Input
          control={control}
          name="name"
          errors={errors.name}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => aboutRef.current?.focus()}
        />

        <LabelWrapper>
          <Label>Sobre</Label>
          <StepItemText>Máximo de 300 caracteres</StepItemText>
        </LabelWrapper>

        <Input
          control={control}
          ref={aboutRef}
          name="about"
          errors={errors.about}
          multiline
          style={{ height: 110 }}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => whatsappRef.current?.focus()}
        />

        <Label>Número de WhatsApp</Label>
        <Input
          control={control}
          ref={whatsappRef}
          name="whatsapp"
          errors={errors.whatsapp}
          keyboardType="number-pad"
          maxLength={11}
        />

        <Label>Fotos</Label>

        <UploadedImagesContainer>
          {images.map(image => (
            <ImagePreview key={image.uri} {...image}>
              <RemoveImage onPress={() => removeImage(image.uri)}>
                <DismissIcon />
              </RemoveImage>
            </ImagePreview>
          ))}
        </UploadedImagesContainer>

        <ImageInput onPress={handleSelectImages} />
      </Form>

      <Button onPress={handleSubmit(nextStep)} loading={isSubmitting}>
        Próximo
      </Button>
    </Container>
  )
}

import React, { useCallback, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/core'
import {
  requestCameraRollPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions
} from 'expo-image-picker'
import { Switch } from 'react-native'
import { LatLng } from 'react-native-maps'
import Toast from 'react-native-simple-toast'

import api from '../../../services/api'
import {
  Container,
  Title,
  Input,
  ImagesInput,
  Label,
  NextButton,
  UploadedImagesContainer,
  UploadedImage,
  NextButtonText,
  SwitchContainer
} from './styles'

interface OrphanageDataRouteParams {
  position: LatLng
}

const OrphanageData: React.FC = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [openOnWeekends, setOpenOnWeekends] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const { position } = route.params as OrphanageDataRouteParams

  const handleSelectImages = useCallback(async () => {
    const { status } = await requestCameraRollPermissionsAsync()

    if (status !== 'granted') {
      Toast.show('Camera permissions denied.')
      return
    }

    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [5, 4],
      mediaTypes: MediaTypeOptions.Images
    })

    if (result.cancelled) {
      return
    }

    const { uri: image } = result
    setImages([...images, image])
  }, [])

  const handleCreateOrphanage = async () => {
    const { latitude, longitude } = position
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
        Toast.show('Orfanato cadastrado com sucesso.')
        navigation.navigate('OrphanagesMap')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>

      <Label>Nome</Label>
      <Input value={name} onChangeText={setName} />

      <Label>Sobre</Label>
      <Input
        multiline
        style={{ height: 110 }}
        value={about}
        onChangeText={setAbout}
      />

      {/* <Label>WhatsApp</Label>
      <Input /> */}

      <Label>Fotos</Label>

      <UploadedImagesContainer>
        {images.map(image => (
          <UploadedImage key={image} source={{ uri: image }} />
        ))}
      </UploadedImagesContainer>

      <ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Title>Visitação</Title>

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

      <NextButton onPress={handleCreateOrphanage}>
        <NextButtonText>Cadastrar</NextButtonText>
      </NextButton>
    </Container>
  )
}

export default OrphanageData

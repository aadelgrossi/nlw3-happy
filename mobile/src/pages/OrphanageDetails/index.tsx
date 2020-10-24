import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Marker } from 'react-native-maps'
import mapMarkerImg from '../../images/mapmarker.png'

import { Feather, FontAwesome } from '@expo/vector-icons'

import {
  Container,
  ImagesContainer,
  Image,
  DetailsContainer,
  Title,
  Description,
  MapContainer,
  Map,
  RoutesContainer,
  RoutesText,
  Separator,
  ScheduleContainer,
  BlueItem,
  BlueText,
  GreenItem,
  GreenText,
  RedItem,
  RedText,
  ContactButton,
  ContactButtonText
} from './styles'
import { useRoute } from '@react-navigation/core'
import api from '../../services/api'
import { Linking } from 'react-native'

interface OrphanageDetailsRouteParams {
  id: string
}

interface Orphanage {
  id: string
  name: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: Array<{
    id: string
    url: string
  }>
}

const OrphanageDetails: React.FC = () => {
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const route = useRoute()

  const params = route.params as OrphanageDetailsRouteParams

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id])

  if (!orphanage) {
    return (
      <Container>
        <Description>Carregando...</Description>
      </Container>
    )
  }

  const handleOpenGoogleMapsRoute = () => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`
    )
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => (
            <Image
              key={image.id}
              source={{
                uri: image.url
              }}
            />
          ))}
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude)
              }}
            ></Marker>
          </Map>
          <RoutesContainer onPress={handleOpenGoogleMapsRoute}>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <BlueItem>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <BlueText>{orphanage.opening_hours}</BlueText>
          </BlueItem>

          {orphanage.open_on_weekends ? (
            <GreenItem>
              <Feather name="info" size={40} color="#39CC83" />
              <GreenText>Abrimos fim de semana</GreenText>
            </GreenItem>
          ) : (
            <RedItem>
              <Feather name="info" size={40} color="#ff669d" />
              <RedText>Não abrimos fim de semana</RedText>
            </RedItem>
          )}
        </ScheduleContainer>

        <ContactButton>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailsContainer>
    </Container>
  )
}

export default OrphanageDetails

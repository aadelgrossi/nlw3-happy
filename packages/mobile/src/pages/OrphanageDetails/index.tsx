import React, { useEffect, useState } from 'react'

import { Feather, FontAwesome } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/core'
import { Linking } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Marker } from 'react-native-maps'

import { mapMarker } from '~/images'
import { InitialRoutesParamList } from '~/routes/types'
import api from '~/services/api'

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

interface OrphanageDetailsProps {
  route: RouteProp<InitialRoutesParamList, 'OrphanageDetails'>
}

export const OrphanageDetails: React.FC<OrphanageDetailsProps> = ({
  route
}) => {
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const { id } = route.params

  useEffect(() => {
    api.get(`/orphanages/${id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [id])

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
              icon={mapMarker}
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

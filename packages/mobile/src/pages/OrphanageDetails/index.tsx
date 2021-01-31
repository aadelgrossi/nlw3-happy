import React, { useEffect, useState } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/core'
import { Linking } from 'react-native'
import { Marker } from 'react-native-maps'

import { InstructionsBadge } from '~/components'
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
  ContactButton,
  ContactButtonText,
  Gallery
} from './styles'

interface OrphanageDetailsProps {
  route: RouteProp<InitialRoutesParamList, 'OrphanageDetails'>
}

export const OrphanageDetails: React.FC<OrphanageDetailsProps> = ({
  route
}) => {
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const { slug } = route.params

  useEffect(() => {
    api.get(`/orphanages/${slug}`).then(response => {
      setOrphanage(response.data)
    })
  }, [slug])

  const handleOpenGoogleMapsRoute = () => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`
    )
  }

  return !orphanage ? (
    <Container>
      <Description>Carregando...</Description>
    </Container>
  ) : (
    <Container>
      <ImagesContainer>
        {orphanage.images && (
          <Gallery
            showPagination
            data={orphanage.images}
            renderItem={({ item }) => <Image source={{ uri: item.url }} />}
          />
        )}
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
            />
          </Map>
          <RoutesContainer onPress={handleOpenGoogleMapsRoute}>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <InstructionsBadge
            type="opening_hours"
            value={orphanage.opening_hours}
          />

          {orphanage.open_on_weekends ? (
            <InstructionsBadge
              type="open_on_weekends"
              value={`Atendemos \nfim de semana`}
            />
          ) : (
            <InstructionsBadge
              type="closed_on_weekends"
              value={`Não atendemos \nfim de semana`}
            />
          )}
        </ScheduleContainer>

        <ContactButton
          onPress={() =>
            Linking.openURL(`whatsapp://send?phone=55${orphanage.whatsapp}`)
          }
        >
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailsContainer>
    </Container>
  )
}

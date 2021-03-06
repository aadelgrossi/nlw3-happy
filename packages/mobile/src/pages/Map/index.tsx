import React, { useCallback, useState, useEffect } from 'react'

import { Feather } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from 'react-native'
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import initialRegion from '~/constants/initialRegion'
import { mapMarker } from '~/images'
import { InitialRoutesParamList } from '~/routes/types'
import api from '~/services/api'

import {
  Container,
  Popup,
  PopupText,
  MapItem,
  PopupView,
  Footer,
  FooterAddButton,
  FooterText
} from './styles'

interface MapProps {
  navigation: StackNavigationProp<InitialRoutesParamList, 'OrphanagesMap'>
}

export const Map: React.FC<MapProps> = ({ navigation }) => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  const fetchOrphanages = useCallback(() => {
    api.get<Orphanage[]>('/orphanages').then(({ data }) => {
      setOrphanages(data)
    })
  }, [])

  useEffect(() => {
    fetchOrphanages()
  }, [fetchOrphanages])

  const handleNavigateToOrphanageDetails = (slug: string) => {
    navigation.navigate('OrphanageDetails', { slug })
  }

  const handleNavigateToCreateOrphanage = () => {
    navigation.navigate('CreateOrphanage', {
      screen: 'SelectLocation'
    })
  }

  return (
    <>
      <Container>
        <MapItem provider={PROVIDER_GOOGLE} initialRegion={initialRegion}>
          {orphanages.map(({ id, latitude, longitude, slug, name }) => (
            <Marker
              key={id}
              icon={mapMarker}
              coordinate={{
                latitude: Number(latitude),
                longitude: Number(longitude)
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.8
              }}
            >
              <Popup
                tooltip
                onPress={() => {
                  handleNavigateToOrphanageDetails(slug)
                }}
              >
                <PopupView>
                  <PopupText>{name}</PopupText>
                </PopupView>
              </Popup>
            </Marker>
          ))}
        </MapItem>

        <Footer>
          <FooterText>{orphanages.length} orfanatos encontrados</FooterText>
          <FooterAddButton onPress={handleNavigateToCreateOrphanage}>
            <Feather name="plus" size={20} color="#fff"></Feather>
          </FooterAddButton>
        </Footer>
      </Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  )
}

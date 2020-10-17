import React, { useCallback, useEffect, useState } from 'react'
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import initialRegion from '../../constants/initialRegion'

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

import mapMarker from '../../images/mapmarker.png'
import { useNavigation } from '@react-navigation/core'
import api from '../../services/api'

interface Orphanage {
  id: string
  name: string
  latitude: number
  longitude: number
}

const Map: React.FC = () => {
  const navigation = useNavigation()
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  const handleNavigateToOrphanageDetails = useCallback((id: string) => {
    navigation.navigate('OrphanageDetails', { id })
  }, [])

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition')
  }, [])

  return (
    <Container>
      <MapItem provider={PROVIDER_GOOGLE} initialRegion={initialRegion}>
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            coordinate={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude)
            }}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
          >
            <Popup
              tooltip
              onPress={() => {
                handleNavigateToOrphanageDetails(orphanage.id)
              }}
            >
              <PopupView>
                <PopupText>{orphanage.name}</PopupText>
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
  )
}

export default Map

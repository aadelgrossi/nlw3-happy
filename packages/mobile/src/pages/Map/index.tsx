import React, { useCallback, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import initialRegion from '../../constants/initialRegion'
import mapMarker from '../../images/mapmarker.png'
import api from '../../services/api'
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

interface Orphanage {
  id: string
  name: string
  latitude: number
  longitude: number
}

const Map: React.FC = () => {
  const navigation = useNavigation()
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useFocusEffect(() => {
    fetchOrphanages()
  })

  const fetchOrphanages = useCallback(() => {
    api.get('/orphanages').then(({ data }) => {
      setOrphanages(data)
    })
  }, [])

  const handleNavigateToOrphanageDetails = (id: string) => {
    navigation.navigate('OrphanageDetails', { id })
  }

  const handleNavigateToCreateOrphanage = () => {
    navigation.navigate('SelectMapPosition')
  }

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

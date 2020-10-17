import React, { useCallback } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { useWindowDimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Constants from 'expo-constants'

import {
  Container,
  Popup,
  PopupText,
  PopupView,
  Footer,
  FooterAddButton,
  FooterText
} from './styles'

import mapMarker from '../../images/mapmarker.png'
import { useNavigation } from '@react-navigation/core'

const Map: React.FC = () => {
  const navigation = useNavigation()
  const window = useWindowDimensions()

  const handleNavigateToOrphanageDetails = useCallback(() => {
    navigation.navigate('OrphanageDetails')
  }, [])

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition')
  }, [])

  return (
    <Container>
      <MapView
        style={{
          width: window.width,
          height: window.height + Constants.statusBarHeight
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -23.0784934,
          longitude: -52.4603822,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -23.0784934,
            longitude: -52.4603822
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
        >
          <Popup tooltip onPress={handleNavigateToOrphanageDetails}>
            <PopupView>
              <PopupText>Lar das Meninas</PopupText>
            </PopupView>
          </Popup>
        </Marker>
      </MapView>

      <Footer>
        <FooterText>2 orfanatos encontrados</FooterText>
        <FooterAddButton onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff"></Feather>
        </FooterAddButton>
      </Footer>
    </Container>
  )
}

export default Map

import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'

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

const Map: React.FC = () => {
  return (
    <Container>
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
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
          <Popup tooltip onPress={() => {}}>
            <PopupView>
              <PopupText>Lar das Meninas</PopupText>
            </PopupView>
          </Popup>
        </Marker>
      </MapView>

      <Footer>
        <FooterText>2 orfanatos encontrados</FooterText>
        <FooterAddButton onPress={() => {}}>
          <Feather name="plus" size={20} color="#fff"></Feather>
        </FooterAddButton>
      </Footer>
    </Container>
  )
}

export default Map

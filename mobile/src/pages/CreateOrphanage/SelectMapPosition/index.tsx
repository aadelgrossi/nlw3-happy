import { useNavigation } from '@react-navigation/core'
import React, { useCallback } from 'react'
import { Marker } from 'react-native-maps'

import mapMarkerImg from '../../../images/mapmarker.png'

import { Container, Map, NextButton, NextButtonText } from './styles'

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation()

  const handleNextStep = useCallback(() => {
    navigation.navigate('OrphanageData')
  }, [])

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}
        />
      </Map>

      <NextButton onPress={handleNextStep}>
        <NextButtonText>Próximo</NextButtonText>
      </NextButton>
    </Container>
  )
}

export default SelectMapPosition

import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { MapEvent, Marker } from 'react-native-maps'

import mapMarkerImg from '../../../images/mapmarker.png'
import initialRegion from '../../../constants/initialRegion'

import { Container, Map, NextButton, NextButtonText } from './styles'

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation()
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  })

  const handleNextStep = () => {
    navigation.navigate('OrphanageData', { position: position })
  }

  const handleSelectMapPosition = (event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <Container>
      <Map initialRegion={initialRegion} onPress={handleSelectMapPosition}>
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            onDragEnd={handleSelectMapPosition}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude
            }}
          />
        )}
      </Map>

      {position.latitude !== 0 && (
        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
    </Container>
  )
}

export default SelectMapPosition

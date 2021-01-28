import React, { useCallback, useState } from 'react'

import { useNavigation } from '@react-navigation/core'
import { Image } from 'react-native'
import { MapEvent, Marker } from 'react-native-maps'
import { usePersistStorage } from 'react-native-use-persist-storage'

import Header from '../../../components/Header'
import initialRegion from '../../../constants/initialRegion'
import CursorPointer from '../../../images/cursor.png'
import mapMarkerImg from '../../../images/mapmarker.png'
import {
  Container,
  Map,
  NextButton,
  NextButtonText,
  OnboardingOverlay,
  OnboardingText,
  OnboardingWrapper
} from './styles'

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation()
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  })

  const [hasRunBefore, setHasRunBefore, restored] = usePersistStorage<boolean>(
    'Happy@HasRunBefore',
    null
  )

  const handleNextStep = () => {
    navigation.navigate('OrphanageData', { position: position })
  }

  const handleSelectMapPosition = (event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate)
  }

  const handleFirstClick = useCallback(() => {
    setHasRunBefore(true)
  }, [])

  return restored ? (
    <Container>
      {!hasRunBefore && (
        <OnboardingWrapper onTouchEnd={handleFirstClick}>
          <Image
            source={CursorPointer}
            style={{
              zIndex: 20,
              marginTop: -100
            }}
          />
          <OnboardingText>
            Toque no mapa para adicionar um orfanato
          </OnboardingText>
          <OnboardingOverlay colors={['#2AB5D1', '#00C7C7']} />
        </OnboardingWrapper>
      )}
      {hasRunBefore && <Header title="Adicione um orfanato" />}
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
  ) : null
}

export default SelectMapPosition

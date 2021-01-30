import React, { useCallback, useState } from 'react'

import { StackNavigationProp } from '@react-navigation/stack'
import { Image } from 'react-native'
import { MapEvent, Marker } from 'react-native-maps'
import { usePersistStorage } from 'react-native-use-persist-storage'

import { Header } from '~/components'
import initialRegion from '~/constants/initialRegion'
import { cursor, mapMarker } from '~/images'
import { CreateOrphanageParamList } from '~/routes/types'

import { ButtonText } from '../styles'
import {
  Map,
  Container,
  FloatingButton,
  OnboardingOverlay,
  OnboardingText,
  OnboardingWrapper
} from './styles'

interface SelectPositionProps {
  navigation: StackNavigationProp<CreateOrphanageParamList, 'SelectLocation'>
}

export const SelectMapPosition: React.FC<SelectPositionProps> = ({
  navigation
}) => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  })

  const [hasRunBefore, setHasRunBefore, restored] = usePersistStorage<boolean>(
    'Happy@HasRunBefore',
    null
  )

  const handleNextStep = () => {
    navigation.navigate('DataSectionOne', { position })
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
            source={cursor}
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
            icon={mapMarker}
            onDragEnd={handleSelectMapPosition}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude
            }}
          />
        )}
      </Map>

      {position.latitude !== 0 && (
        <FloatingButton onPress={handleNextStep}>
          <ButtonText>Próximo</ButtonText>
        </FloatingButton>
      )}
    </Container>
  ) : null
}

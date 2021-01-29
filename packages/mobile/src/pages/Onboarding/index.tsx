import React, { useCallback } from 'react'

import { StackNavigationProp } from '@react-navigation/stack'
import { Image, StatusBar } from 'react-native'
import Onboarding, { Page } from 'react-native-onboarding-swiper'

import { Dots, NextButton } from '~/components/Onboarding'
import { onboarding01, onboarding02 } from '~/images'
import { InitialRoutesParamList } from '~/routes/types'

import { styles } from './styles'

interface OnboardingProps {
  navigation: StackNavigationProp<InitialRoutesParamList, 'Onboarding'>
}

export const OnboardingScreens: React.FC<OnboardingProps> = ({
  navigation
}) => {
  const handleDone = useCallback(async () => {
    navigation.navigate('CreateOrphanage', {
      screen: 'SelectLocation'
    })
  }, [navigation])

  const pages: Page[] = [
    {
      title: 'Leve felicidade para o mundo',
      titleStyles: styles.pageOneTitle,
      backgroundColor: '#F2F3F5',
      subtitle: 'Visite orfanatos e mude o dia de muitas crianças',
      subTitleStyles: styles.pageOneSubTitle,
      image: <Image source={onboarding01} style={styles.pageOneImageStyles} />
    },
    {
      title: 'Escolha um orfanato no mapa e faça uma visita',
      subtitle: '',
      titleStyles: styles.pageTwoTitle,
      backgroundColor: '#F2F3F5',
      image: <Image source={onboarding02} style={styles.pageTwoImageStyles} />
    }
  ]
  return (
    <>
      <Onboarding
        pages={pages}
        showSkip={false}
        DotComponent={Dots}
        controlStatusBar={false}
        bottomBarHighlight={false}
        bottomBarStyles={{
          paddingHorizontal: 50,
          marginTop: -120
        }}
        NextButtonComponent={NextButton}
        DoneButtonComponent={NextButton}
        onDone={handleDone}
      />
      <StatusBar barStyle="light-content" />
    </>
  )
}

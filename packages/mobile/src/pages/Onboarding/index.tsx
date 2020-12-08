import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, StatusBar } from 'react-native'
import Onboarding, { Page } from 'react-native-onboarding-swiper'
import { usePersistStorage } from 'react-native-use-persist-storage'

import Dots from '../../components/Onboarding/Dots'
import NextButton from '../../components/Onboarding/NextButton'
import onboardingImage1 from '../../images/onboarding01.png'
import onboardingImage2 from '../../images/onboarding02.png'
import { styles } from './styles'

const OnboardingScreens: React.FC = () => {
  const navigation = useNavigation()
  const [_, setHasRunBefore] = usePersistStorage('Happy@HasRunBefore', null)

  const handleDone = useCallback(async () => {
    setHasRunBefore(true)
    navigation.navigate('OrphanagesMap')
  }, [navigation, setHasRunBefore])

  const pages: Page[] = [
    {
      title: 'Leve felicidade para o mundo',
      titleStyles: styles.pageOneTitle,
      backgroundColor: '#F2F3F5',
      subtitle: 'Visite orfanatos e mude o dia de muitas crianças',
      subTitleStyles: styles.pageOneSubTitle,
      image: (
        <Image source={onboardingImage1} style={styles.pageOneImageStyles} />
      )
    },
    {
      title: 'Escolha um orfanato no mapa e faça uma visita',
      subtitle: '',
      titleStyles: styles.pageTwoTitle,
      backgroundColor: '#F2F3F5',
      image: (
        <Image source={onboardingImage2} style={styles.pageTwoImageStyles} />
      )
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
        bottomBarHeight={140}
        NextButtonComponent={NextButton}
        DoneButtonComponent={NextButton}
        onDone={handleDone}
      />
      <StatusBar barStyle="light-content" />
    </>
  )
}

export default OnboardingScreens

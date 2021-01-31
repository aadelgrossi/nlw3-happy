import React from 'react'

import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold
} from '@expo-google-fonts/nunito'
import { useFonts } from 'expo-font'
import { StatusBar } from 'react-native'

import Routes from './src/routes'

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    nunitoRegular: Nunito_600SemiBold,
    nunitoBold: Nunito_700Bold,
    nunitoTitle: Nunito_800ExtraBold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <Routes />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </>
  )
}

export default App

import React from 'react'
import { useFonts } from 'expo-font'
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold
} from '@expo-google-fonts/nunito'

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

  return <Routes />
}

export default App

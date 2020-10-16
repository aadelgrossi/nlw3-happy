import React from 'react'
import { StatusBar, View } from 'react-native'
import { useFonts } from 'expo-font'
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold
} from '@expo-google-fonts/nunito'

import Map from './src/pages/Map'

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
    <View>
      <StatusBar />
      <Map />
    </View>
  )
}

export default App

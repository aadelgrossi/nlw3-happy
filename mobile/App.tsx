import React from 'react'
import { StatusBar, View } from 'react-native'

import Map from './src/pages/Map'

const App: React.FC = () => {
  return (
    <View>
      <StatusBar />
      <Map />
    </View>
  )
}

export default App

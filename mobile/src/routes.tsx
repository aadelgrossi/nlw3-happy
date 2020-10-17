import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack'

import Map from './pages/Map'
import OrphanageDetails from './pages/OrphanageDetails'

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <Screen name="OrphanagesMap" component={Map}></Screen>
        <Screen name="OrphanageDetails" component={OrphanageDetails}></Screen>
        <Screen name="SelectMapPosition" component={SelectMapPosition}></Screen>
        <Screen name="OrphanageData" component={OrphanageData}></Screen>
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes

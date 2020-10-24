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
import Header from './components/Header'

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#f2f3f5'
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <Screen name="OrphanagesMap" component={Map}></Screen>
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showDismiss={false} title="Orfanato" />
          }}
        ></Screen>
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        ></Screen>
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Preencha os dados" />
          }}
        ></Screen>
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes

import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack'
import { usePersistStorage } from 'react-native-use-persist-storage'

import Header from './components/Header'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import Map from './pages/Map'
import Onboarding from './pages/Onboarding'
import OrphanageDetails from './pages/OrphanageDetails'

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => {
  const [hasRunBefore, _, restored] = usePersistStorage<string>(
    'Happy@HasRunBefore',
    null
  )

  return (
    restored && (
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
          {!hasRunBefore && <Screen name="Onboarding" component={Onboarding} />}
          <Screen name="OrphanagesMap" component={Map} />
          <Screen
            name="OrphanageDetails"
            component={OrphanageDetails}
            options={{
              headerShown: true,
              header: () => <Header showDismiss={false} title="Orfanato" />
            }}
          />
          <Screen
            name="SelectMapPosition"
            component={SelectMapPosition}
            options={{
              headerShown: true,
              header: () => <Header title="Selecione no mapa" />
            }}
          />
          <Screen
            name="OrphanageData"
            component={OrphanageData}
            options={{
              headerShown: true,
              header: () => <Header title="Preencha os dados" />
            }}
          />
        </Navigator>
      </NavigationContainer>
    )
  )
}

export default Routes

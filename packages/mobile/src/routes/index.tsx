import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack'
import { usePersistStorage } from 'react-native-use-persist-storage'

import { Header } from '~/components'
import { Map, OnboardingScreens, OrphanageDetails } from '~/pages'

import { CreateOrphanageNavigator } from './create_orphanage_routes'
import { InitialRoutesParamList } from './types'

const { Navigator, Screen } = createStackNavigator<InitialRoutesParamList>()

const Routes: React.FC = () => {
  const [hasRunBefore, _, restored] = usePersistStorage<boolean>(
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
          {!hasRunBefore && (
            <Screen name="Onboarding" component={OnboardingScreens} />
          )}
          <Screen name="OrphanagesMap" component={Map} />
          <Screen
            name="OrphanageDetails"
            component={OrphanageDetails}
            options={{
              headerShown: true,
              header: () => <Header showDismiss={false} title="Orfanato" />
            }}
          />
          <Screen name="CreateOrphanage" component={CreateOrphanageNavigator} />
        </Navigator>
      </NavigationContainer>
    )
  )
}

export default Routes

import React from 'react'

import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack'

import { Header } from '~/components'
import { DataSectionOne, DataSectionTwo, SelectMapPosition } from '~/pages'

import { CreateOrphanageParamList } from './types'

const { Navigator, Screen } = createStackNavigator<CreateOrphanageParamList>()

export const CreateOrphanageNavigator: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Screen
        name="SelectLocation"
        component={SelectMapPosition}
        options={{
          headerShown: false
        }}
      />
      <Screen
        name="DataSectionOne"
        component={DataSectionOne}
        options={{
          headerShown: true,
          header: () => <Header />
        }}
      />
      <Screen
        name="DataSectionTwo"
        component={DataSectionTwo}
        options={{ headerShown: true, header: () => <Header /> }}
      />
    </Navigator>
  )
}

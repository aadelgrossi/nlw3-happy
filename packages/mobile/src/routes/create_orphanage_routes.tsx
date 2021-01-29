import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { Header } from '~/components'
import { OrphanageData, SelectMapPosition } from '~/pages'

import { CreateOrphanageParamList } from './types'

const { Navigator, Screen } = createStackNavigator<CreateOrphanageParamList>()

export const CreateOrphanageNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name="SelectLocation"
        component={SelectMapPosition}
        options={{
          headerShown: false
        }}
      />
      <Screen
        name="DataSectionOne"
        component={OrphanageData}
        options={{
          headerShown: true,
          header: () => <Header title="Preencha os dados" />
        }}
      />
      {/* <Screen name="DataSectionTwo" component={} /> */}
    </Navigator>
  )
}

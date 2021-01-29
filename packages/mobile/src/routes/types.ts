import { NavigatorScreenParams } from '@react-navigation/core'
import { LatLng } from 'react-native-maps'

export type InitialRoutesParamList = {
  Onboarding: undefined
  OrphanagesMap: undefined
  OrphanageDetails: {
    id: string
  }
  CreateOrphanage: NavigatorScreenParams<CreateOrphanageParamList>
}

export type CreateOrphanageParamList = {
  SelectLocation: undefined
  DataSectionOne: {
    position: LatLng
  }
  DataSectionTwo: undefined
}

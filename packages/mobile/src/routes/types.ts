import { NavigatorScreenParams } from '@react-navigation/core'
import { LatLng } from 'react-native-maps'

import { OrphanageSectionOneFormData } from '~/pages/CreateOrphanage/types'

export type InitialRoutesParamList = {
  Onboarding: undefined
  OrphanagesMap: undefined
  OrphanageDetails: {
    slug: string
  }
  CreateOrphanage: NavigatorScreenParams<CreateOrphanageParamList>
}

export type CreateOrphanageParamList = {
  SelectLocation: undefined
  CancelPrompt: undefined
  SuccessPrompt: undefined
  DataSectionOne: {
    position: LatLng
  }
  DataSectionTwo: {
    orphanage: OrphanageSectionOneFormData & LatLng
  }
}

import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const UploadedImagesContainer = styled.View``

export const RemoveImage = styled(BorderlessButton)`
  padding: 20px;
  margin-left: auto;
`

export const DismissIcon = styled(Feather).attrs({
  name: 'x',
  size: 24,
  color: '#ff669d'
})``

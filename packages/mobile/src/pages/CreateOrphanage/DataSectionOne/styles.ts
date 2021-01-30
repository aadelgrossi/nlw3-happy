import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const ImagesInput = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.5);
  border-style: dashed;
  border-color: #96d2f0;
  border-width: 1.4px;
  border-radius: 20px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin: 8px 0 32px;
`

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

import { Feather } from '@expo/vector-icons'
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
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

export const PlusIcon = styled(Feather).attrs({
  name: 'plus',
  size: 24,
  color: '#15B6D6'
})``

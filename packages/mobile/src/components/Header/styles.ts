import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 32px 12px 12px;
  background-color: #f9fafc;
  border-bottom-width: 1px;
  border-bottom-color: #dde3f0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.Text`
  font-family: 'nunitoBold';
  color: #8fa7b3;
  font-size: 20px;
`

export const EmptyButtonSpace = styled.View`
  padding: 30px;
`
export const BackButton = styled(BorderlessButton)`
  padding: 20px;
`
export const DismissButton = styled(BorderlessButton)`
  padding: 20px;
`

export const LeftArrowIcon = styled(Feather).attrs({
  name: 'arrow-left',
  size: 24,
  color: '#15b6d6'
})``

export const DismissIcon = styled(Feather).attrs({
  name: 'x',
  size: 24,
  color: '#ff669d'
})``

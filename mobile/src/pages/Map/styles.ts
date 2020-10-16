import { Callout } from 'react-native-maps'
import styled from 'styled-components/native'

export const Container = styled.View``

export const Popup = styled(Callout)``
export const PopupView = styled.View`
  width: 160px;
  height: 46px;
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  justify-content: center;
`
export const PopupText = styled.Text`
  color: #0089a5;
  font-size: 14px;
`

import { RectButton } from 'react-native-gesture-handler'
import MapView, { Callout } from 'react-native-maps'
import styled from 'styled-components/native'

export const Container = styled.View``

export const MapItem = styled(MapView)`
  width: 100%;
  height: 100%;
`

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
  font-family: 'nunitoBold';
`
export const Footer = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px;

  background-color: #fff;
  border-radius: 16px;
  height: 56px;
  padding-left: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  elevation: 2;
`
export const FooterText = styled.Text`
  font-family: 'nunitoBold';
  color: #8fa7b3;
`
export const FooterAddButton = styled(RectButton)`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  background-color: #15c3d6;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

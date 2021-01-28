import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import MapView from 'react-native-maps'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  position: relative;
`

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`

export const NextButton = styled(RectButton)`
  background-color: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 56px;

  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 40px;
`

export const NextButtonText = styled.Text`
  font-family: 'nunitoTitle';
  font-size: 16px;
  color: #fff;
`

export const OnboardingOverlay = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  z-index: 10;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  right: 0;
  opacity: 0.7;
`

export const OnboardingWrapper = styled.View`
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  right: 0;
  height: ${Dimensions.get('screen').height}px;
  width: ${Dimensions.get('screen').width}px;
`

export const OnboardingText = styled.Text`
  color: #fff;
  z-index: 20;
  width: 220px;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  font-family: 'nunitoTitle';
`

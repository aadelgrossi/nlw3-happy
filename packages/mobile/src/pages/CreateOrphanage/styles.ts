import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
`

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom-width: 0.8px;
  border-bottom-color: #d3e2e6;
`

export const Title = styled.Text`
  color: #5c8599;
  font-size: 26px;
  font-family: 'nunitoBold';
`

export const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const StepItemText = styled.Text`
  font-size: 14px;
  font-family: 'nunitoRegular';
  color: #8fa7b2;
`

export const CurrentStep = styled(StepItemText)`
  font-family: 'nunitoTitle';
  color: #8fa7b2;
`

export const Label = styled.Text`
  color: #8fa7b2;
  font-family: 'nunitoRegular';
  margin-bottom: 8px;
`

export const Input = styled.TextInput`
  background-color: #fff;
  border-width: 1.4px;
  border-color: #d3e2e6;
  border-radius: 20px;
  height: 56px;
  padding: 18px 24px;
  margin-bottom: 16px;
  text-align-vertical: top;
`

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`
export const NextButton = styled(RectButton)`
  background-color: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-top: 32px;
`

export const ButtonText = styled.Text`
  font-family: 'nunitoTitle';
  font-size: 16px;
  color: #fff;
`

export const ConfirmButton = styled(RectButton)`
  background-color: #37c77f;
`

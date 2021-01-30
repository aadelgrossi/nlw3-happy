import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

interface ButtonProps {
  confirm?: boolean
}

export const Container = styled(RectButton)<ButtonProps>`
  background-color: ${props => (props.confirm ? '#37c77f' : '#15c3d6')};
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

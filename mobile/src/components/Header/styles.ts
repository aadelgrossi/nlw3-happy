import styled from 'styled-components/native'

import { BorderlessButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  padding: 24px;
  background-color: #f9fafc;
  border-width: 1px;
  border-color: #dde3f0;
  padding-top: 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.Text`
  font-family: 'nunitoBold';
  color: #8fa7b3;
  font-size: 20px;
`
export const BackButton = styled(BorderlessButton)``
export const DismissButton = styled(BorderlessButton)``

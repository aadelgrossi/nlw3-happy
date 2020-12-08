import { DotProps } from 'react-native-onboarding-swiper'
import styled from 'styled-components/native'

export const Container = styled.View<DotProps>`
  margin-right: 8px;
  height: 4px;
  border-radius: 4px;
  width: ${props => (props.selected ? 16 : 4)}px;
  background-color: ${props => (props.selected ? '#FFD152' : '#BECFD8')};
`

import { TouchableOpacityProps } from 'react-native'
import styled, { css } from 'styled-components/native'

interface Props extends TouchableOpacityProps {
  label: 'Sim' | 'Não'
  active: boolean
}

export const Container = styled.TouchableOpacity<Props>`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: #d3e2e5;
  border-width: 1px;

  ${props =>
    props.label === 'Sim' &&
    css`
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      border-right-width: 0;
    `}

  ${({ label, active }) =>
    label === 'Sim' &&
    active &&
    css`
      background-color: #edfff6;
      border-color: #a1e9c5;
    `}

  ${props =>
    props.label === 'Não' &&
    css`
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    `}
  
  ${({ label, active }) =>
    label === 'Não' &&
    active &&
    css`
      background-color: #ffe4ee;
      border-color: #ffc2d8;
    `}
`

export const OptionText = styled.Text<Props>`
  font-family: 'nunitoRegular';
  color: #5c8599;
  font-size: 15px;

  ${({ label, active }) =>
    label === 'Sim' &&
    active &&
    css`
      color: #39cc83;
    `}

  ${({ label, active }) =>
    label === 'Não' &&
    active &&
    css`
      color: #ff669d;
    `}
`

import styled, { css } from 'styled-components'

interface InputProps {
  isFocused: boolean
  isFilled: boolean
  hasError: boolean
}

export const Container = styled.div<InputProps>`
  font-size: 16px;
  background-color: #f5f8fa;
  border-radius: 20px;
  border: 1px solid #d3e2e5;

  color: #5c8599;

  ${props =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #a1e9c5;
    `};
  ${props =>
    props.isFilled &&
    css`
      border-color: #a1e9c5;
    `};
`

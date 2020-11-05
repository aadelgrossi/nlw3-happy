import styled, { css } from 'styled-components'

interface InputProps {
  isFocused: boolean
  hasError: boolean
}

export const Wrapper = styled.div`
  span {
    margin-top: 8px;
    font-size: 14px;
    color: #c53030;
  }

  & + & {
    margin-top: 20px;
  }
`

export const InputContainer = styled.div<InputProps>`
  display: flex;
  align-items: center;
  justify-content: center;
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

  input {
    height: 64px;
    width: 100%;
    background: #f5f8fa;
    border-radius: 20px;
    border: 0;
    padding: 0 21px;
    color: #5c8599;
    font-size: 16px;

    &:focus {
      outline: 0;
    }
  }

  svg {
    margin: 0 24px 0 0;
    cursor: pointer;
  }
`

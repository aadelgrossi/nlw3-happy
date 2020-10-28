import styled, { css } from 'styled-components'

interface InputProps {
  isFocused: boolean
  isFilled: boolean
  hasError: boolean
}

export const Wrapper = styled.div`
  label {
    display: flex;
    color: #8fa7b3;
    font-size: 16px;
    margin-bottom: 8px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: #8fa7b3;
      margin-left: 24px;
      line-height: 24px;
    }
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
  ${props =>
    props.isFilled &&
    css`
      border-color: #a1e9c5;
    `};

  textarea {
    border-radius: 20px;
    padding: 0 21px;
    font-size: 16px;
    color: #5c8599;
    background: #f5f8fa;
    border: 0;
    width: 100%;

    min-height: 120px;
    max-height: 240px;
    resize: vertical;
    padding: 16px;
    line-height: 28px;

    &:focus {
      outline: 0;
    }
  }

  svg {
    margin: 0 24px 0 0;
    cursor: pointer;
  }
`
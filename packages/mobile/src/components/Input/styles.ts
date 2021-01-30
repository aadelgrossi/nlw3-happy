import styled, { css } from 'styled-components/native'

interface InputWrapperProps {
  hasError: boolean
  isFocused?: boolean
}

export const Container = styled.View`
  margin-bottom: 16px;
`

export const InputWrapper = styled.View<InputWrapperProps>`
  display: flex;
  align-items: center;
  font-size: 16px;
  background-color: #f5f8fa;
  border-radius: 20px;
  border: 1px solid #d3e2e5;
  margin-bottom: 4px;

  color: #5c8599;

  ${props =>
    props.hasError &&
    css`
      border-color: #ff669d;
    `}

  ${props =>
    props.isFocused &&
    !props.hasError &&
    css`
      border-color: #a1e9c5;
    `};
`

export const InputField = styled.TextInput`
  width: 100%;
  border: 0;
  height: 56px;
  padding: 18px 24px;
  font-size: 15px;
  text-align-vertical: top;
  font-family: 'nunitoRegular';
  color: #5c8599;
`

export const Error = styled.Text`
  color: #ff669d;
  font-size: 12px;
`

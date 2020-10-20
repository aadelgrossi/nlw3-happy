import styled, { css } from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.div`
  height: 100vh;
  position: relative;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  img {
    width: 48px;
  }
`

export const FormContainer = styled.aside`
  position: relative;
  height: 100%;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 30%;
  min-width: 520px;
`

export const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    width: max(40%, 300px);
    height: max(15%, 120px);
  }
`

export const Location = styled.div`
  font-size: 24px;
  line-height: 34px;
  display: flex;
  flex-direction: column;
  text-align: center;

  strong {
    font-weight: 800;
  }
`

export const SignInForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60%;
  min-width: 360px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #5c8599;
    margin-bottom: 36px;
  }
`

export const BackButton = styled.a`
  position: absolute;
  z-index: 1;
  top: 40px;
  right: 40px;

  width: 48px;
  height: 48px;

  border: 0;

  background: #ebf2f5;
  border-radius: 16px;

  cursor: pointer;

  transition: background-color 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const FormInput = styled.div`
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

  input {
    height: 64px;
    width: 100%;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
    padding: 0 16px;
  }

  & + & {
    margin-top: 20px;
  }
`

export const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  color: #8fa7b2;

  label {
    height: 36px;
    display: flex;
    align-items: center;

    input {
      height: 0;
      width: 0;
    }

    span {
      cursor: pointer;
      width: 26px;
      margin-right: 10px;
      height: 26px;
      border: 1px solid #d3e2e5;
      border-radius: 10px;
    }
  }
`
interface ConfirmButtonProps {
  disabled: boolean
}

export const ConfirmButton = styled.button<ConfirmButtonProps>`
  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #37c77f;
  border-radius: 20px;
  color: #ffffff;
  margin-top: 64px;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    `}

  transition: background-color, opacity 0.2s;

  svg {
    margin-right: 16px;
  }

  &:hover {
    background: #36cf82;
  }
`

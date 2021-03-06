import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: flex;
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

  transition: background-color 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;
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

export const ResetPasswordForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60%;
  width: 360px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #5c8599;
    margin-bottom: 24px;
  }

  p {
    font-size: 18;
    font-weight: 600;
    color: #5c8599;
    margin-bottom: 40px;
  }
`
export const InputField = styled.div`
  & + & {
    margin-top: 20px;
  }
`

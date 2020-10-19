import React, { useCallback, useState, useRef } from 'react'

import Input from '@/components/Input'
import Checkbox from '@/components/Checkbox'
import Logo from '../../assets/logo.svg'

import { useRouter } from 'next/router'

import {
  BackButton,
  Container,
  FormContainer,
  SignInForm,
  LogoContainer,
  Location,
  FormInput,
  ForgotPasswordContainer
} from './styles'
import { FiArrowLeft } from 'react-icons/fi'

const SignIn: React.FC = () => {
  const formRef = useRef(null)
  const { back } = useRouter()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)

  const handleSubmit = useCallback(data => {
    console.log(data)
  }, [])

  return (
    <Container>
      <BackButton onClick={back}>
        <FiArrowLeft size={24} color="#15C3D6" />
      </BackButton>

      <LogoContainer>
        <Logo />

        <Location>
          <strong>Paranavaí</strong>
          <span>Paraná</span>
        </Location>
      </LogoContainer>

      <FormContainer>
        <SignInForm ref={formRef} onSubmit={handleSubmit}>
          <h1>Fazer login</h1>
          <FormInput>
            <label htmlFor="email">E-mail</label>
            <Input name="email" type="email"></Input>
          </FormInput>

          <FormInput>
            <label>Senha</label>
            <Input name="password" type="password"></Input>
          </FormInput>

          <ForgotPasswordContainer>
            <label>
              <Checkbox
                checked={keepLoggedIn}
                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              ></Checkbox>
              Lembrar-me
            </label>
            <a>Esqueci minha senha</a>
          </ForgotPasswordContainer>
        </SignInForm>
      </FormContainer>
    </Container>
  )
}

export default SignIn

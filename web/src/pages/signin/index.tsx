import React, { useCallback, useState, useRef } from 'react'
import * as Yup from 'yup'

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
  ConfirmButton,
  ForgotPasswordContainer
} from './styles'
import { FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { back } = useRouter()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const handleSubmit = useCallback(
    (data: SignInFormData) => {
      console.log(data)
    },
    [keepLoggedIn]
  )

  const performValidation = useCallback(async () => {
    try {
      setIsFormValid(true)
      formRef.current?.setErrors({})
      const data = formRef.current.getData()
      console.log(data)

      const schema = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(6)
      })

      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      setIsFormValid(false)
    }
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
            <Input
              name="email"
              type="email"
              onKeyUp={performValidation}
            ></Input>
          </FormInput>

          <FormInput>
            <label>Senha</label>
            <Input
              name="password"
              type="password"
              onKeyUp={performValidation}
            ></Input>
          </FormInput>

          <ForgotPasswordContainer>
            <label>
              <Checkbox
                checked={keepLoggedIn}
                onChange={() => setKeepLoggedIn(value => !value)}
              ></Checkbox>
              Lembrar-me
            </label>
            <a>Esqueci minha senha</a>
          </ForgotPasswordContainer>
          <ConfirmButton disabled={!isFormValid}>Entrar</ConfirmButton>
        </SignInForm>
      </FormContainer>
    </Container>
  )
}

export default SignIn

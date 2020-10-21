import React, { useCallback, useState, useRef } from 'react'
import * as Yup from 'yup'

import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import FormContainer from '@/components/FormContainer'
import LogoContainer from '@/components/LogoContainer'

import { useRouter } from 'next/router'

import {
  BackButton,
  Container,
  SignInForm,
  ConfirmButton,
  ForgotPasswordContainer
} from './styles'
import { FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { useAuth } from '@/hooks/auth'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { back, push } = useRouter()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const { signIn } = useAuth()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
          keep_logged_in: keepLoggedIn
        })

        push('/dashboard')
      } catch (err) {
        console.log(err)
      }
    },
    [keepLoggedIn]
  )

  const performValidation = useCallback(async () => {
    try {
      setIsFormValid(true)
      formRef.current?.setErrors({})
      const data = formRef.current.getData()

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

      <LogoContainer />

      <FormContainer>
        <SignInForm ref={formRef} onSubmit={handleSubmit}>
          <h1>Fazer login</h1>
          <Input label="Email" name="email" onKeyUp={performValidation}></Input>

          <Input
            label="Senha"
            name="password"
            onKeyUp={performValidation}
          ></Input>

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

import React, { useCallback, useState, useRef } from 'react'

import Checkbox from '@/components/Checkbox'
import FormContainer from '@/components/FormContainer'
import Input from '@/components/Input'
import Label from '@/components/Label'
import LogoContainer from '@/components/LogoContainer'
import PasswordInput from '@/components/PasswordInput'
import { useAuth } from '@/hooks/auth'
import { useToast } from '@/hooks/toast'
import { FormHandles } from '@unform/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import * as Yup from 'yup'

import {
  BackButton,
  Container,
  SignInForm,
  ConfirmButton,
  ForgotPasswordContainer
} from './styles'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { push } = useRouter()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const { addToast } = useToast()
  const { signIn } = useAuth()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
          keep_logged_in: keepLoggedIn
        })

        addToast({ title: 'Seja-bem-vindo', type: 'success' })
        push('/dashboard')
      } catch (err) {
        addToast({
          title: 'Ocorreu um erro',
          type: 'error',
          description: 'Dados incorretos. Verifique seu email ou senha.'
        })
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
      <BackButton onClick={() => push('/')}>
        <FiArrowLeft size={24} color="#15C3D6" />
      </BackButton>

      <LogoContainer />

      <FormContainer>
        <SignInForm ref={formRef} onSubmit={handleSubmit}>
          <h1>Fazer login</h1>
          <Label>E-mail</Label>
          <Input name="email" onKeyUp={performValidation} />

          <Label>Senha</Label>
          <PasswordInput name="password" onKeyUp={performValidation} />

          <ForgotPasswordContainer>
            <label>
              <Checkbox
                checked={keepLoggedIn}
                onChange={() => setKeepLoggedIn(value => !value)}
              ></Checkbox>
              Lembrar-me
            </label>
            <Link href="/forgot-password">
              <a> Esqueci minha senha</a>
            </Link>
          </ForgotPasswordContainer>
          <ConfirmButton disabled={!isFormValid}>Entrar</ConfirmButton>
        </SignInForm>
      </FormContainer>
    </Container>
  )
}

export default SignIn

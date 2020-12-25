import React, { useCallback, useState, useRef } from 'react'

import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import Label from '@/components/Label'
import LogoContainer from '@/components/LogoContainer'
import PasswordInput from '@/components/PasswordInput'
import SubmitButton from '@/components/SubmitButton'
import { useAuth } from '@/hooks/auth'
import { useToast } from '@/hooks/toast'
import { FormHandles } from '@unform/core'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import * as Yup from 'yup'

import {
  BackButton,
  Container,
  SignInForm,
  ForgotPasswordContainer,
  FormContainer
} from './styles'

interface SignInFormData {
  email: string
  password: string
  remember: boolean
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [remember, setRemember] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { push } = useRouter()
  const { addToast } = useToast()
  const { signIn } = useAuth()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true)
        await signIn(data)
        addToast({ title: 'Seja-bem-vindo', type: 'success' })
        push('/dashboard')
        setLoading(false)
      } catch (err) {
        addToast({
          title: 'Ocorreu um erro',
          type: 'error',
          description: 'Dados incorretos. Verifique seu email ou senha.'
        })
        setLoading(false)
      }
    },
    [addToast, push, signIn]
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
      <Head>
        <title>Happy | Faça seu login</title>
      </Head>

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
                name="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Lembrar-me
            </label>
            <Link href="/forgot-password">
              <a style={{ color: 'inherit' }}> Esqueci minha senha</a>
            </Link>
          </ForgotPasswordContainer>
          <SubmitButton loading={loading} formValid={isFormValid}>
            Entrar
          </SubmitButton>
        </SignInForm>
      </FormContainer>
    </Container>
  )
}

export default SignIn

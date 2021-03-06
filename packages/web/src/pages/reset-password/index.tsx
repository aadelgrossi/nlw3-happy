import React, { useCallback, useEffect, useRef, useState } from 'react'

import Label from '@/components/Label'
import LogoContainer from '@/components/LogoContainer'
import PasswordInput from '@/components/PasswordInput'
import SubmitButton from '@/components/SubmitButton'
import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import { FormHandles } from '@unform/core'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import * as Yup from 'yup'

import {
  Container,
  BackButton,
  ResetPasswordForm,
  InputField,
  FormContainer
} from './styles'

interface ResetPasswordFormData {
  password: string
}

interface ResetPasswordProps {
  token: string | string[]
}

const ResetPassword: NextPage<ResetPasswordProps> = ({ token }) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()
  const { back, push } = useRouter()
  const formRef = useRef<FormHandles>(null)

  useEffect(() => {
    function redirectIfMissingOrInvalidToken() {
      if (!token) {
        push('/forgot-password')
        addToast({
          title: 'Ops, ocorreu um erro!',
          description:
            'Não foi possível encontrar uma requisição para troca de senha válida',
          type: 'error'
        })
      }
    }
    redirectIfMissingOrInvalidToken()
  }, [addToast, push, token])

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true)
        await api.post(`/password/reset`, {
          password: data.password,
          token
        })

        push('/signin')
        addToast({
          title: 'Senha resetada com sucesso',
          description: 'Realize o login.',
          type: 'success'
        })
        setLoading(false)
      } catch (err) {
        addToast({
          title: 'Ops, ocorreu um erro!',
          description: 'Não foi possível realizar a troca de senha.',
          type: 'error'
        })
        setLoading(false)
        formRef.current?.reset()
      }
    },
    [addToast, push, token]
  )

  const performValidation = useCallback(async () => {
    try {
      setIsFormValid(true)
      formRef.current?.setErrors({})
      const data = formRef.current.getData()

      const schema = Yup.object().shape({
        password: Yup.string().required(),
        password_confirmation: Yup.string()
          .nullable()
          .oneOf([Yup.ref('password'), null])
      })

      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      setIsFormValid(false)
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>Happy | Redefinição de senha</title>
      </Head>

      <LogoContainer></LogoContainer>
      <FormContainer>
        <BackButton onClick={back}>
          <FiArrowLeft size={24} color="#15C3D6" />
        </BackButton>

        <ResetPasswordForm ref={formRef} onSubmit={handleSubmit}>
          <h1>Redefinição de senha</h1>
          <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>

          <InputField>
            <Label>Nova senha</Label>
            <PasswordInput
              name="password"
              onKeyUp={performValidation}
            ></PasswordInput>
          </InputField>

          <InputField>
            <Label>Repetir senha</Label>
            <PasswordInput
              label="Repetir senha"
              name="password_confirmation"
              onKeyUp={performValidation}
            ></PasswordInput>
          </InputField>

          <SubmitButton loading={loading} formValid={isFormValid}>
            Enviar
          </SubmitButton>
        </ResetPasswordForm>
      </FormContainer>
    </Container>
  )
}

ResetPassword.getInitialProps = async ({ query }) => {
  const { token } = query

  return { token }
}

export default ResetPassword

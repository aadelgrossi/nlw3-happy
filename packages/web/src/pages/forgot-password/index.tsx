import React, { useCallback, useRef, useState } from 'react'

import FormContainer from '@/components/FormContainer'
import Input from '@/components/Input'
import Label from '@/components/Label'
import LogoContainer from '@/components/LogoContainer'
import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import * as Yup from 'yup'

import {
  Container,
  BackButton,
  ForgotPasswordForm,
  ConfirmButton
} from './styles'

interface ForgotPasswordFormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [isFormValid, setIsFormValid] = useState(false)
  const { back, push } = useRouter()
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      await api.post('/password/forgot', { email: data.email })
      addToast({
        title: 'Redenifição de senha requisitada.',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
        type: 'info'
      })
      push('/signin')
    } catch (err) {
      addToast({
        title: 'Erro ao solicitar redefinição',
        description:
          'Este parece ser um email não válido em nossa plataforma. Verifique seus dados.',
        type: 'error'
      })
    }
  }, [])

  const performValidation = useCallback(async () => {
    try {
      setIsFormValid(true)
      formRef.current?.setErrors({})
      const data = formRef.current.getData()

      const schema = Yup.object().shape({
        email: Yup.string().required().email()
      })

      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      setIsFormValid(false)
    }
  }, [])

  return (
    <Container>
      <LogoContainer></LogoContainer>
      <FormContainer>
        <BackButton onClick={back}>
          <FiArrowLeft size={24} color="#15C3D6" />
        </BackButton>

        <ForgotPasswordForm ref={formRef} onSubmit={handleSubmit}>
          <h1>Esqueci a senha</h1>
          <p>
            Informe seu email para receber as instruções e redefinir sua senha
          </p>

          <Label>Email</Label>
          <Input name="email" onKeyUp={performValidation}></Input>
          <ConfirmButton disabled={!isFormValid}>Enviar</ConfirmButton>
        </ForgotPasswordForm>
      </FormContainer>
    </Container>
  )
}

export default ForgotPassword
